from keybert import KeyBERT
from kobert.pytorch_kobert import get_pytorch_kobert_model
from kobert.utils import get_tokenizer

import torch
from torch import nn
from torch.utils.data import Dataset
import gluonnlp as nlp
import numpy as np
import pandas as pd

from .BERT_class import BERTClassifier
from .BERT_class import BERTDataset

import math
import random

import os
os.environ["TOKENIZERS_PARALLELISM"] = "false"


if torch.cuda.is_available():    
    device = torch.device("cuda")
    print('There are %d GPU(s) available.' % torch.cuda.device_count())
    print('We will use the GPU:', torch.cuda.get_device_name(0))
else:
    device = torch.device("cpu")
    print('No GPU available, using the CPU instead.')

device = torch.device('cpu')
    
bertmodel, vocab = get_pytorch_kobert_model()

kw_model = KeyBERT(bertmodel)
print('SUCCES LOAD KeyBERT model')

class BERTClassifier(nn.Module):
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes=10,
                 dr_rate=None,
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
        if self.dr_rate:
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


max_len = 64   # 텍스트 데이터 최대 길이
batch_size = 64

PATH = 'recommend/ai_model/'
model = torch.load(PATH + '10emotions_model_2_10epoch.pt', map_location='cpu')
model.load_state_dict(torch.load(PATH + '10emotions_model_state_dict_2_10epoch.pt', map_location='cpu'))


tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)


def emotion_predict(predict_sentence):

    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=2)
    
    model.eval()

    for (token_ids, valid_length, segment_ids, label) in test_dataloader:
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)

        valid_length= valid_length
        label = label.long().to(device)

        out = model(token_ids, valid_length, segment_ids)

        return out[0]

def keyword_extrack(text):
    kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 1), stop_words=None, top_n=3)
    return kw_model

def emotion_rank(pre_result):
    if pre_result[8] >= math.sqrt(sum(abs(pre_result))/10):
        pre_result[8] = max(float(pre_result[8] ** 2), pre_result[8])
    if pre_result[9] >= math.sqrt(sum(abs(pre_result))/10):
        pre_result[9] = max(float(pre_result[9] ** 2), pre_result[9])
        
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
    return e

def recommend_song(df, emotion, keywords):
    keyword_list = [i[0] for i in keywords]
    e1, e2, e3 = emotion_rank(emotion[0])
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
        
    for word in keyword_list:
        x = df[df.loc[:, 'key_sentence'].str.contains(word)]
        for i in x.song_id:
            add_score(i, 50, 1)
            
