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
# kw_model = KeyBERT(bertmodel)
# print('LOADING SUCCESS KeyBERT model')


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


def emotion_predict(model, predict_sentence):

    data = [[predict_sentence, '0']]

    another_test = BERTDataset(data, 0, 1, tok, 512, True, False)
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


def recommend_cosine(df, input_emotion):
    
    input_array = np.array([[int(i*1000) for i in input_emotion]])

    cons = cosine_similarity(df.iloc[:, 2:12].values, input_array)
    
    recommend_id_list = sorted(enumerate(cons), reverse=True, key=lambda x: x[1])
    
    recommend_id_list = [random.choice(recommend_id_list[:4])]
    
    song_id_list = []
    for idx in recommend_id_list:
        song_id_list.append(df.iloc[idx[0], 1])
        
    return song_id_list



# ========================================================================================================

# 사용할지 미지수인 함수들

# ========================================================================================================



# 키워드 추출기는 리소스를 굉장히 많이 사용하기 때문에 서버에서 구동할 수가 없다...





# 추출된 감성의 점수 상위 3개를 선정. 긍정 감성의 점수는 양수일 경우 편향값을 준다

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