from __future__ import print_function
import pandas as pd
from collections import defaultdict
import math
import json
import csv

filePath="F:/大三下课件/地信网络实习/newstatisticresult/"
resultPath="F:/大三下课件/地信网络实习/json/"
resultPath2="F:/大三下课件/地信网络实习/jsdata/"
filename = "relationindex.csv"

csvfile=open(filePath+filename,'r',encoding='utf-8')
jsonfile=open(resultPath+'relationindex.json','w',encoding='utf-8')
fieldnames=("date","country1","country2","num","index","avgindex")
reader=csv.DictReader(csvfile,fieldnames)
for row in reader:
    json.dump(row,jsonfile)
    jsonfile.write(',')
    # jsonfile.write('\n')

jsonfile.close()
csvfile.close()
# dataRead = pd.read_csv(filePath+filename)
# dataRead.columns = ["date","type","number"
#                    ]
# dataFilter = dataRead[['date','type','number']]
# num1 = defaultdict(int)
# num2 = defaultdict(int)
# for indexs in dataFilter.index:
#     date = dataFilter.loc[indexs].values[0]
#     typ = dataFilter.loc[indexs].values[1]
#     number = dataFilter.loc[indexs].values[2]
#     num1[date,typ]=number

# jsfile=open(resultPath2+"attitude.js","w",encoding="utf-8")
# print('//态度数据汇总',file=jsfile)
# print('var index=[',file=jsfile)
# for dic,num in num1.items():
#     print("["+str(dic[0])+","+"'"+str(dic[1])+"'"+"],\n",file=jsfile)
# print(']',file=jsfile)
# print('var attitude=[',file=jsfile)
# for dic,num in num1.items():
#     print(str(num)+",\n",file=jsfile)
# print(']',file=jsfile)
# jsfile.close()

