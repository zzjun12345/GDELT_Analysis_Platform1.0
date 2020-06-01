import pandas as pd
import networkx as nx
import gexf
from gexf import Gexf
from gexf import Node
from gexf import Edge
from gexf import Graph
from gexf import GexfImport
import xml
import xml.etree.ElementTree as ET
from xml.dom.minidom import parse
from xml.dom.minidom import parseString
import xml.dom.minidom as Dom
import sys
import math

resultPath = "F:/大三下课件/地信网络实习/newstatisticresult/"
Time = '20200110'  # 要处理的数据的时间
timenum=20200110
gexfPath = 'F:/大三下课件/地信网络实习/newgexf/'  
# ij=0
# while ij<100:
    #timenum += 1
Time=str(timenum)
# 获取数据
nodeList = pd.read_csv(resultPath + 'countrybasic.csv')
edgeList = pd.read_csv(resultPath + 'relationbasic.csv')
nodeList.columns = ['date','country', 'number']
edgeList.columns = ['date','country1', 'country2', 'number']

#提取当天数据
nodeFilter=nodeList[['date','country', 'number']]
edgeFilter=edgeList[['date','country1', 'country2', 'number']]

nodecountry=[]
nodenumber=[]
edgecountry1=[]
edgecountry2=[]
edgenumber=[]
count1=0
count2=0
countsum=0

for indexs in nodeFilter.index:
    date=nodeFilter.loc[indexs].values[0]
    country=nodeFilter.loc[indexs].values[1]
    nnumber=nodeFilter.loc[indexs].values[2]
    if str(date)==Time:
        nodecountry.append(country)
        nodenumber.append(nnumber)
        count1+=1
        countsum+=nnumber

for indexs in edgeFilter.index:
    date=edgeFilter.loc[indexs].values[0]
    country1=edgeFilter.loc[indexs].values[1]
    country2=edgeFilter.loc[indexs].values[2]
    enumber=edgeFilter.loc[indexs].values[3]
    if str(date)==Time:
        edgecountry1.append(country1)
        edgecountry2.append(country2)
        edgenumber.append(enumber)
        count2+=1
# print(nodecountry[0])
# print(edgecountry1[count2-1])
# 初始化网络
# countryGraph = nx.Graph()


# # 根据输入文件构建国家交互网络
# def graphBuild(nodeList, edgeList):
#     # for indexs in nodeList.index:
#     # graphCon.add_node(nodeList.node[indexs].strip())
#     # 上面注释了的代码是添加节点，不过也可以不需要，因为下面添加边的时候，边两端的节点会自动添加到网络中
#     for indexs in edgeList.index:
#         countryGraph.add_edge(edgeList.edgeNode1[indexs].strip(), edgeList.edgeNode2[indexs].strip(),
#                               weight=edgeList.numCount[indexs])  # 添加边与权重


# graphBuild(nodeList, edgeList)  # 运行网络构建函数

# # 输出网络
# nx.write_gexf(countryGraph, gexfPath + 'graph_' + dataTime + 'c1.gexf')  # 输出为Gephi格式
# print("ss")
# print(gexf)
gexf = Gexf("Gephi.org","A Web network")
graph=gexf.addGraph("undirected","static","A Web network")
atr1 = graph.addNodeAttribute('Modularity_class',force_id='modularity_class',type='integer')
atr2 = graph.addNodeAttribute('country',force_id='country',type='string')
atr3 = graph.addNodeAttribute('nodenumber',force_id='nodenumber',type='integer')
# atr3 = graph.addNodeAttribute('frog',type='boolean',defaultValue='true')
eatr1= graph.addEdgeAttribute('country1',force_id='country1',type='string',defaultValue='country1')
eatr2= graph.addEdgeAttribute('country2',force_id='country2',type='string',defaultValue='country2')
eatr3= graph.addEdgeAttribute('edgenumber',force_id='edgenumber',type='integer',defaultValue='0')

i=0
j=0

while i<count1:
    tmp = graph.addNode(id=nodecountry[i],label=nodecountry[i])
    tmp.addAttribute(atr2,nodecountry[i])
    tmp.addAttribute(atr3,str(nodenumber[i]))
    #print(nodenumber[i])
    if int(nodenumber[i])>0.04*countsum:
        tmp.addAttribute(atr1,'0')
    elif int(nodenumber[i])>0.015*countsum:
        tmp.addAttribute(atr1,'1')
    elif int(nodenumber[i])>0.005*countsum:
        tmp.addAttribute(atr1,'2')
    elif int(nodenumber[i])>0.00125*countsum:
        tmp.addAttribute(atr1,'3')
    else:
        tmp.addAttribute(atr1,'4')
    i+=1

print(edgecountry1[0])
print(edgecountry2[0])

while j<count2:
    wei=round(pow(float(edgenumber[j]),1/2))
    tmp = graph.addEdge(j,edgecountry1[j],edgecountry2[j],weight=wei)
    tmp.addAttribute(eatr1,edgecountry1[j])
    tmp.addAttribute(eatr2,edgecountry2[j])
    tmp.addAttribute(eatr3,str(edgenumber[j]))
    j+=1
# tmp = graph.addNode("1","Webatlas")
# tmp.addAttribute(atr1,"http://webatlas.fr")
# tmp.addAttribute(atr2,'2')

# tmp = graph.addNode("2","RTGI")
# tmp.addAttribute(atr1,"http://rtgi.fr")
# tmp.addAttribute(atr2,'1')

# tmp = graph.addNode("3","BarabasiLab")
# tmp.addAttribute(atr1,"http://barabasilab.com")
# tmp.addAttribute(atr2,'1')
# tmp.addAttribute(atr3,'false')

# tmp=graph.addEdge("0","0","1",weight='1')
# tmp.addAttribute(eatr1,"国家1")
# tmp.addAttribute(eatr2,"国家2")
# tmp.addAttribute(eatr3,"交互次数")


# graph.addEdge("1","0","2",weight='3')
# graph.addEdge("2","1","0",weight='10')
# graph.addEdge("3","2","1",weight='2')
# graph.addEdge("4","0","3",weight='20')
print(count1)
print(Time)
print(countsum)
print('')
output_file=open("F:/大三下课件/地信网络实习/newgexf/"+str(timenum)+".gexf","wb")
gexf.write(output_file)
output_file.close()
# ij+=1

