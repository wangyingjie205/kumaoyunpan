fname = input("请输入要打开的文件：")
fo = open(fname, 'w+', encoding="utf-8")
ls = ["宋词", "唐诗", "元曲"]
fo.writelines(ls)
fo.seek(0)
for line in fo:
    print(line)
fo.close()
fname = input("请输入要打开得文件")
fo = open(fname, "a+", encoding="utf-8")
ls = ["宋词", "唐诗", "元曲"]
fo.writelines(ls)
fo.seek(0)
for line in fo:
    print(line)
fo.close()