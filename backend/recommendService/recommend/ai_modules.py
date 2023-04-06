# from keybert import KeyBERT
from kobert.pytorch_kobert import get_pytorch_kobert_model
from kobert.utils import get_tokenizer

import torch
from torch import nn
from torch.utils.data import Dataset
import gluonnlp as nlp
from sklearn.metrics.pairwise import cosine_similarity

import numpy as np
import pandas as pd

import math
import random

import os
os.environ["TOKENIZERS_PARALLELISM"] = "false"

print('IMPORT SUCCESS ')

device = torch.device("cpu")

print('LOADING tokenizer and BERTmodel')
bertmodel, vocab = get_pytorch_kobert_model()
tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)
print('LOADING SUCCESS tokenizer, bertmodel')

# print('LOADING keyBERT model')
# kw_model = KeyBERT(bertmodel),
# print('LOADING SUCCESS KeyBERT model')

emotion_list = ['분노', '악의', '슬픔', '절망', '당황', '걱정', '질투', '상처', '사랑', '행복']

class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes=10,
                 dr_rate=0.5,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate
                 
        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)
    
    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)
        
        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device))
        global out
        out = self.dropout(pooler)
        return self.classifier(out)


class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len,
                 pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))

    def __len__(self):
        return (len(self.labels))


def load_model_1():
    print('LOADING koBERT Classifier model 1')
    PATH='./ai_model/'
    model1 = BERTClassifier(bertmodel)
    model1.load_state_dict(torch.load(PATH + '10emotions_model_state_dict_1.pt', map_location='cpu'))
    print('LOADING SUCCESS koBERT Classifier model 1')
    return model1

    
def load_model_2():
    PATH='./ai_model/'
    print('LOADING koBERT Classifier model 2 - 10epoch')
    model2 = BERTClassifier(bertmodel)
    model2.load_state_dict(torch.load(PATH + '10emotions_model_state_dict_2_10epoch.pt', map_location='cpu'))
    print('LOADING SUCCESS koBERT Classifier model 2 - 10epoch')
    return model2


def emotion_predict(model, predict_sentence, max_len):

    data = [[predict_sentence, '0']]

    another_test = BERTDataset(data, 0, 1, tok, max_len, True, False)
    dataloader = torch.utils.data.DataLoader(another_test, batch_size=64, num_workers=2)
    
    model.eval()

    for (token_ids, valid_length, segment_ids, label) in dataloader:
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)
        
    print('SUCCESS emotion predict : ', out[0])
    return out[0]


def emotion_t2_rank(emo_list):
    emo_list = emo_list.tolist()
    for i in range(len(emo_list)):
        if emo_list[i] == max(emo_list):
            t1 = i
            break
    emo_list[t1] = -10
    for i in range(len(emo_list)):
        if emo_list[i] == max(emo_list):
            t2 = i
            break
    print(f'top 1 emo : {t1}, top 2 emo : {t2}')
    return t1, t2




def drow_id(select_score, colper):
    
    drow_box = []
    for i in range(len(select_score)):
        mul = 0
        for k, v in colper.items():
            mul += select_score.iloc[i, k] // v if select_score.iloc[i, k] else 0
            
        drow_box.extend([i] * mul)

    select_1 = random.choice(drow_box)
    select_2 = random.choice(drow_box)
    while select_1 == select_2:
        select_2 = random.choice(drow_box)

    return (select_score.iloc[select_1, 0], select_score.iloc[select_2, 0])

# sadly : 1 , calm : 2, love : 3, farewall : 4, cool : 5, myway : 6, comic : 7, anger : 8, exciting: 9

def predict_category(score_board, t):
# 분노 폭발
    if t == 0:
        select_score = score_board[(score_board.iloc[:, 8] > 0) | (score_board.iloc[:, 6] > 0)]
        colper = {8: 10, 6: 20}
        recommend_song_id = drow_id(select_score, colper)

    # 분노 다스리기
    elif t == 1:
        select_score = score_board[(score_board.iloc[:, 2] > 0) | (score_board.iloc[:, 5] > 0)]
        colper = {2: 10, 5: 30}
        recommend_song_id = drow_id(select_score, colper)

    # 슬픔 터뜨리기
    elif t == 2:
        select_score = score_board[(score_board.iloc[:, 1] > 0) | (score_board.iloc[:, 3] > 0)]
        colper = {1: 10, 3: 20}
        recommend_song_id = drow_id(select_score, colper)

    # 절망 다스리기
    elif t == 3:
        select_score = score_board[(score_board.iloc[:, 2] > 0) | (score_board.iloc[:, 9] > 0)]
        colper = {2: 10, 9: 20}
        recommend_song_id = drow_id(select_score, colper)
        
    # 당황, 웃음
    elif t == 4:
        select_score = score_board[(score_board.iloc[:, 7] > 0) | (score_board.iloc[:, 9] > 0)]
        colper = {7: 10, 9: 20}
        recommend_song_id = drow_id(select_score, colper)

    # 걱정은 당당하게
    elif t == 5:
        select_score = score_board[(score_board.iloc[:, 6] > 0) | (score_board.iloc[:, 9] > 0)]
        colper = {6: 10, 9: 20}
        recommend_song_id = drow_id(select_score, colper)

    # 컴플렉스는 분노 폭발
    elif t == 6:
        select_score = score_board[(score_board.iloc[:, 6] > 0) | (score_board.iloc[:, 8] > 0)]
        colper = {6: 10, 8: 20}
        recommend_song_id = drow_id(select_score, colper)

    # 상처는 노래로 위로
    elif t == 7:
        select_score = score_board[(score_board.iloc[:, 2] > 0) | (score_board.iloc[:, 3] > 0)]
        colper = {2: 10, 3: 20}
        recommend_song_id = drow_id(select_score, colper)

    # 사랑은 더욱 사랑스럽게
    elif t == 8:
        select_score = score_board[(score_board.iloc[:, 3] > 0) | (score_board.iloc[:, 2] > 0)]
        colper = {3: 10, 9: 30}
        recommend_song_id = drow_id(select_score, colper)

    # 행복함은 즐기기
    elif t == 9:
        select_score = score_board[(score_board.iloc[:, 2] > 0) | (score_board.iloc[:, 9] > 0) | (score_board.iloc[:, 5] > 0)]
        colper = {3: 10, 5:20, 9: 30}
        recommend_song_id = drow_id(select_score, colper)
        
    return recommend_song_id
    
    
    
    
    
    
    
    
    

# ========================================================================================================

# 사용할지 미지수인 함수들

# ========================================================================================================



# 키워드 추출기는 리소스를 굉장히 많이 사용하기 때문에 서버에서 구동할 수가 없다...


# 추출된 감성의 점수 상위 3개를 선정. 긍정 감성의 점수는 양수일 경우 편향값을 준다


def recommend_cosine(df, input_emotion):
    
    input_rank = sorted(enumerate(input_emotion), key=lambda x:x[1], reverse=True)

    top_3 = input_rank[0:3]
    bottom_2 = input_rank[8:]

    input_t3_rank = [i[0] for i in top_3]
    input_b2_rank = [i[0] for i in bottom_2]

    input_t3_array = np.array([[int(input_emotion[i]*1000) for i in input_t3_rank]])
    input_b2_array = np.array([[int(input_emotion[i]*1000) for i in input_b2_rank]])
    
    input_t3_rank = [i+2 for i in input_t3_rank]
    input_b2_rank = [i+2 for i in input_b2_rank]

    cons_t = cosine_similarity(df.iloc[:, input_t3_rank].values, input_t3_array)
    cons_b = cosine_similarity(df.iloc[:, input_b2_rank].values, input_b2_array)

    cons = cons_t + cons_b/5

    recommend_id = sorted(enumerate(cons), reverse=True, key=lambda x: x[1])[0]

    song_id = (df.iloc[recommend_id[0], 1])
        
    return song_id




def emotion_rank(pre_result):
    if pre_result[8] >= math.sqrt(sum(abs(pre_result))/10):
        pre_result[8] = pre_result[8] + math.sqrt(pre_result[8]) 
    if pre_result[9] >= math.sqrt(sum(abs(pre_result))/10):
        pre_result[9] = pre_result[9] + math.sqrt(pre_result[9]) 
        
    for i in range(8):
        pre_result[i] = (pre_result[i]/5)*4
    
    mask = sorted(enumerate(pre_result), key=lambda x:x[1], reverse=True)
    e = []
    tmp = []
    for i, x in mask:
        if len(e) >= 3:
            break
        if x > float(sum(abs(pre_result))/len(pre_result)):
            e.append(i+1)
        elif x >= math.sqrt(abs(sum(pre_result)))/len(pre_result):
            tmp.append(i+11)
    else:
        while len(e) < 3:
            if tmp:
                e.append(tmp.pop(0))
            else:
                e.append(0)
    
    print('SUCCESS eomtion rank : ', e)
    return e


def recommend_song(df, emotion):
    e1, e2, e3 = emotion_rank(emotion)
    song_dic = {}

    def add_score(i, score, is_sec):
        if song_dic.get(i):
            song_dic[i] += (score+random.random())/is_sec
        else:
            song_dic[i] = score/is_sec
        
    is_sec = 2 if e1 > 10 else 1
    x = df[df.loc[:, 'emotion_1'] == e1]
    for i in x.song_id:
        rs = round(random.random(),3)
        song_dic[i] = (100+rs)/is_sec
    x = df[df.loc[:, 'emotion_2'] == e1]
    for i in x.song_id:
        rs = round(random.random(),3)
        song_dic[i] = (80+rs)/is_sec
    x = df[df.loc[:, 'emotion_3'] == e1]
    for i in x.song_id:
        rs = round(random.random(),3)
        song_dic[i] = (50+rs)/is_sec

    is_sec = 3 if e2 > 10 else 1
    x = df[df.loc[:, 'emotion_1'] == e2]
    for i in x.song_id:
        add_score(i, 70, is_sec)
    x = df[df.loc[:, 'emotion_2'] == e2]
    for i in x.song_id:
        add_score(i, 90, is_sec)
    x = df[df.loc[:, 'emotion_3'] == e2]
    for i in x.song_id:
        add_score(i, 50, is_sec)

    is_sec = 3 if e3 > 10 else 1
    x = df[df.loc[:, 'emotion_1'] == e3]
    for i in x.song_id:
        add_score(i, 40, is_sec)
    x = df[df.loc[:, 'emotion_2'] == e3]
    for i in x.song_id:
        add_score(i, 50, is_sec)
    x = df[df.loc[:, 'emotion_3'] == e3]
    for i in x.song_id:
        add_score(i, 60, is_sec)

    rec_list = sorted([[k,v]for k, v in song_dic.items()],key=lambda x: x[1], reverse=True)
    
    return random.choice(rec_list[:4])[0]