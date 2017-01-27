b = []

with open("questions.txt") as file:
  try:
    while file.readline() != "":
      a = {}
      a["question"] = file.readline().strip()
      a["options"] = file.readline().strip().split(", ")
      a["answer"] = file.readline().strip()
      b.append(a)
  except:
    pass

for each in b:
  print("Question: {}".format(each.get("question")))
  print("Option: {}".format(each.get("options")))
  print("Answer: {}".format(each.get("answer")))
  print()