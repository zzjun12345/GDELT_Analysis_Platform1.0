from __future__ import print_function
import pandas as pd
from collections import defaultdict
import math
import xml
import xml.etree.ElementTree as ET
import xml.dom.minidom as Dom
from xml.dom.minidom import parse
from xml.dom.minidom import parseString
import sys
import random
# c=2
# m2= [[0 for i in range(3)] for i in range(3)] 
# m3=[[]]
# m3.append([1,1,1])
# m3.append([1,1,1,1])
# m3.append([1,2,3])
# m3.append([1,2,3,4])
# m2[1][1]=m2[1][1]+1
# print(m2)
# print(m3[3][2])
# time=[0,1,2,3,4,5,6]
# cal=0
# for t in time:
#     if t!=4:
#         cal=cal+t
#     else:
#         cal=cal+0
# print(cal)
# countryindex = defaultdict(list)
# a=1
# b=22
# c=333
# countryindex[1,2,3]=[2,24.5]
# countryindex[1,2,3]=[2,23,22]
# countryindex[1,2,3]=[a,b,c]
# print(countryindex[1,2,3])
tree = parse(r'../gexf/data2.gexf')
type(tree)
datalist=tree.documentElement
# print(datalist.toxml())
# print(datalist.lastChild)

graph=datalist.getElementsByTagName('graph')[0]
nodes=graph.getElementsByTagName('nodes')[0]
nodelist=nodes.childNodes
print(nodelist.length)
nodenum=round((nodelist.length-1)/2)
print(nodenum)
for node in nodes.childNodes:
    if node.hasChildNodes():
        attvalues=node.getElementsByTagName('attvalues')[0]
        # print(node.toxml())
        attvalue1=attvalues.getElementsByTagName('attvalue')[1]
        value1=attvalue1.getAttribute('value')
        size1=round(pow(float(value1),1/2))
        doc=Dom.Document()
        size=doc.createElement('viz:size')
        size.setAttribute('value',str(size1))
        node.appendChild(size)
        color=doc.createElement('viz:color')
        a=random.randint(0,255)
        b=random.randint(0,255)
        c=random.randint(0,255)
        color.setAttribute('r',str(a))
        color.setAttribute('g',str(b))
        color.setAttribute('b',str(c))
        node.appendChild(color)
        posi=doc.createElement('viz:position')
        posi.setAttribute('x',str(a))
        posi.setAttribute('y',str(b))
        posi.setAttribute('z',str(c))
        node.appendChild(posi)
# print(attvalue1.toxml())
print(nodes.toxml())

f = open("../gexf/ans3.gexf", "w") 
tree.writexml(f,addindent='    ', newl='')
f.close()

