from bottle import route, run, SimpleTemplate, static_file, request, BaseRequest
import sqlite3
import json
import os
import math

html = open("./templ/index.html", 'r').read()
tpl = SimpleTemplate(html)  # for all pages
# record on one page
lim = 12
BaseRequest.MEMFILE_MAX = 1024 * 1024  # 403 error
DB = 'db.db'


def readDB():
    conn = sqlite3.connect(DB)
    c = conn.cursor()

    # All record
    record = c.execute('SELECT * FROM record ORDER BY id').fetchall()
    conn.close()
    # Split tags
    r = []
    for el in record:
        e = []
        e.append(int(el[0]))
        e.append(el[1])
        e.append(el[2])
        e.append(el[3])
        e.append(el[4])
        e.append([i.strip() for i in el[5].split(',')])
        r.append(e)
    return r[::-1]


def readTags():
    # All tags
    tags = {}
    for el in readDB():
        t = el[5]
        for x in t:
            if x in tags:
                tags[x] += 1
            else:
                tags[x] = 1
    # Tags in descending order
    return sorted(tags.items(), key=lambda x: x[1], reverse=True)


def recordByTag(t):
    arr = []
    for el in readDB():
        if t in el[5]:
            arr.append(el)
    print(len(arr))
    return arr


@route('/static/tag.json')
def server_static():
    l = [x[0] for x in readTags()]
    return json.dumps(l)


@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./static')


@route('/')
def index():
    return tpl.render(edit=True, articl=readDB()[:lim], tags=readTags(), lim=lim, page=1, allrecord=len(readDB()))


@route('/page/<p:int>')
def page(p):
    mi = lim * (p - 1)
    ma = lim * p
    return tpl.render(edit=True, articl=readDB()[mi:ma], tags=readTags(), lim=lim, page=p, allrecord=len(readDB()))


@route('/tag/<t>')
def tag(t):
    t = t.strip()
    rec = recordByTag(t)
    return tpl.render(edit=True, articl=rec[:lim], tags=readTags(), lim=lim, page=1, allrecord=len(rec), t=t)


@route('/tag/<t>/page/<p:int>')
def tagPage(t, p):
    t = t.strip()
    rec = recordByTag(t)
    mi = lim * (p - 1)
    ma = lim * p
    return tpl.render(edit=True, articl=rec[mi:ma], tags=readTags(), lim=lim, page=p, allrecord=len(rec), t=t)


@route('/edit/<i:int>')
def edit(i):
    for el in readDB():
        if el[0] == i:
            return json.dumps(el)


@route('/save', method='POST')
def save():
    j = request.json
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    data = (j['title'], j['url'], j['img'], j['about'], j['tags'], j['id'])
    c.execute(
        "UPDATE record SET title=?, link=?, img=?, about=?, tags=? WHERE id=?", data)
    conn.commit()
    conn.close()


@route('/del/<i:int>')
def delet(i):
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("DELETE FROM record WHERE id=" + str(i))
    conn.commit()
    conn.close()


@route('/new', method='POST')
def new():
    j = request.json
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("INSERT INTO record VALUES (NULL,'" + j['title'] + "','" + j['url']
              + "','" + j['img'] + "','" + j['about'] + "','" + j['tags'] + "')")
    conn.commit()
    conn.close()


@route('/gen')
def gen():
    rootGen = "site"
    os.system("mkdir " + rootGen)
    os.system("cp -r static " + rootGen)
    # Index
    index = open(rootGen+"/index.html", 'w')
    index.write(tpl.render(articl=readDB()[:lim], tags=readTags(), lim=lim, page=1, allrecord=len(readDB())))
    index.close()

    # page
    countPages = math.ceil(len(readDB())/lim)
    for x in range(2, countPages+1):
        name = rootGen+"/page/"+str(x)
        os.system("mkdir -p '{}'".format(name))
        pages = open(name + "/index.html", 'w')
        mi = lim * (x - 1)
        ma = lim * x
        pages.write(tpl.render(articl=readDB()[mi:ma], tags=readTags(), lim=lim, page=x, allrecord=len(readDB())))        
        pages.close()

    # tag
    listTags = readTags()
    for x in range(len(listTags)):
        tag = listTags[x][0]
        fold = rootGen+"/tag/"+tag
        rec = recordByTag(tag)
        
        os.system("mkdir -p '{}'".format(fold))
        tagFile = open(fold + "/index.html", 'w')
        tagFile.write(tpl.render(articl=rec[:lim], tags=readTags(), lim=lim, page=1, allrecord=len(rec), t=tag))
        tagFile.close()
    # page tags
    
run(host='localhost', port=8080, debug=True)
