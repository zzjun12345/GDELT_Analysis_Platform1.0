from __future__ import print_function
import pandas as pd
from collections import defaultdict
import math
filePath = "F:/大三下课件/地信网络实习/newdata/"  # 数据存放路径
resultPath="F:/大三下课件/地信网络实习/newresult/"

filename = "GDELTm5.csv"
dataRead = pd.read_csv(filePath+filename)
dataRead.columns = ['GLOBALEVENTID','Quadclass','isrootevent','eventcode','eventbasecode','eventrootcode',
                    'GoldsteinScale','NumMentions','NumSources','NumArticles',
                    'AvgTone', 'day',
                    'Actor1Code','Actor2Code','Actor1CountryCode','Actor2CountryCode',
                    'ActionGeo_Lat','ActionGeo_Lon','ActionCountry'
                    ]
dataFilter = dataRead[['GLOBALEVENTID','eventcode','eventrootcode','Quadclass','GoldsteinScale','NumMentions','NumSources','NumArticles','AvgTone','day','Actor1CountryCode','Actor2CountryCode','ActionGeo_Lat','ActionGeo_Lon','ActionCountry']]
#dataFilter = dataFilter.dropna()  # 去掉有空值的行
dataFilter = dataFilter.reset_index(drop=True) 

def calculate(datafil,dicFile):
    for indexs in datafil.index:
        Globaleventid = datafil.loc[indexs].values[0]
        quadclass = datafil.loc[indexs].values[3]
        eventcode = datafil.loc[indexs].values[1]
        eventrootcode = datafil.loc[indexs].values[2]
        goldsteinscale = datafil.loc[indexs].values[4]
        nummentions = datafil.loc[indexs].values[5]
        numsources = datafil.loc[indexs].values[6]
        numarticles = datafil.loc[indexs].values[7]
        avgtone = datafil.loc[indexs].values[8]
        date = datafil.loc[indexs].values[9]
        Actor1Country = datafil.loc[indexs].values[10]
        Actor2Country = datafil.loc[indexs].values[11]
        ActionLat = datafil.loc[indexs].values[12]
        ActionLon = datafil.loc[indexs].values[13]
        Actioncountry = datafil.loc[indexs].values[14]
    
        #在此写指数计算过程
        attitude=""
        influencial=0
        if abs(avgtone)<1:
            attitude="neutral"
        elif avgtone<-5:
            attitude="severely negative"
        elif avgtone<=-1:
            attitude="negative"
        elif avgtone<=5:
            attitude="positive"
        else:
            attitude="extremely positive"
        influence=pow(nummentions*numarticles*numsources,1/6)
        if influence>6:
            influencial=1
        char1=str(Globaleventid)+','+str(date)+','+str(Actor1Country)+','+str(Actor2Country)+','+str(Actioncountry)+','+str(eventcode)+','+str(eventrootcode)+','+str(avgtone)+','+str(quadclass)+','+str(goldsteinscale)+','+str(attitude)+','+str(influence)+','+str(influencial)+','+str(ActionLat)+','+str(ActionLon)
        print(char1,file=dicFile)
        
dicfile = open(resultPath + 'ans' + 'GDELTm5.csv', 'w')
print('GlobaleventID'',''day'',''Actor1Country'',''Actor2Country'',''ActionCountry'',''eventcode'',''eventrootcode'',''AvgTone'',''quadclass'',''goldsteinscale'',''attitude'',''influence'',''isinfluential'',''ActionLat'',''ActionLon',file=dicfile)
calculate(dataFilter,dicfile)
dicfile.close()