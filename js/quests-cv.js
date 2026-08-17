QUESTS.push(
// ---- COMPUTER VISION ----
{id:'cv1',trackId:'cv',title:'Deep Learning основы',emoji:'🧠',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Deep Learning — подраздел ML где модели строятся из слоёв нейронов.\n\nНейрон: z = Σwᵢxᵢ + b → activation(z)\n\nАктивации:\n• ReLU: max(0,x) — самая популярная\n• Sigmoid: 1/(1+e⁻ˣ) — бинарная классификация\n• Softmax — мультиклассовая\n\nПочему глубина работает:\n• Слой 1: края, текстуры\n• Слой 2: части объектов\n• Слой 3+: объекты целиком\n\nBackpropagation:\n1. Forward: вход → выход → Loss\n2. Backward: градиент Loss по каждому весу\n3. GD: обновляем веса\n\nPyTorch — стандарт для исследований.',code:null},
  {title:'Код',xp:15,type:'code',description:'pip install torch, затем набери:',code:`import torch\nimport torch.nn as nn\n\n# Тензоры\nx = torch.tensor([1.0,2.0,3.0])\nA = torch.randn(3,4); B = torch.randn(4,2)\nC = A@B; print(f"A{A.shape}@B{B.shape}=C{C.shape}")\n\n# Автодифференцирование + GD\nw = torch.tensor(2.0,requires_grad=True)\nb = torch.tensor(0.0,requires_grad=True)\nx_data = torch.linspace(0,1,100)\ny_data = 3*x_data+1+0.1*torch.randn(100)\n\nfor epoch in range(200):\n    y_pred = w*x_data+b\n    loss = ((y_pred-y_data)**2).mean()\n    loss.backward()\n    with torch.no_grad():\n        w -= 0.1*w.grad; b -= 0.1*b.grad\n    w.grad.zero_(); b.grad.zero_()\n\nprint(f"w={w.item():.3f} (~3), b={b.item():.3f} (~1)")`},
  {title:'Задача',xp:20,type:'task',description:'Создай нейронную сеть для Iris через nn.Sequential:\nInput(4) → Linear(16) → ReLU → Linear(8) → ReLU → Linear(3)\n\n1. Напиши training loop: forward → CrossEntropyLoss → backward → Adam.step()\n2. Обучи 100 эпох, выводи loss каждые 10\n3. Посчитай accuracy на тестовых данных\n\nfrom sklearn.datasets import load_iris',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Что такое backpropagation?\n2. Зачем ReLU вместо линейной?\n3. Что такое requires_grad=True?\n4. Чем PyTorch отличается от sklearn?',code:null}
]},
{id:'cv2',trackId:'cv',title:'CNN: свёрточные сети',emoji:'🖼️',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'CNN — архитектура для изображений.\n\nКлючевые операции:\n• Conv2d — скользящий фильтр, детектирует локальные паттерны\n  Параметры: in_channels, out_channels, kernel_size\n• MaxPool2d — уменьшение размера в 2×, берёт максимум\n• BatchNorm2d — нормализация, ускоряет обучение\n• Flatten → Linear — переход к классификации\n\nТипичная архитектура:\nInput → [Conv→BN→ReLU→Pool] × N → Flatten → FC → Output\n\nПочему CNN лучше FC для изображений:\n• Weight sharing — один фильтр на всё изображение\n• Local connectivity — паттерны локальны\n• Translation invariance',code:null},
  {title:'Код',xp:15,type:'code',description:'CNN для MNIST (pip install torch torchvision):',code:`import torch, torch.nn as nn, torch.optim as optim\nfrom torchvision import datasets,transforms\nfrom torch.utils.data import DataLoader\n\ntransform = transforms.Compose([transforms.ToTensor(),transforms.Normalize((0.1307,),(0.3081,))])\ntrain_loader = DataLoader(datasets.MNIST('./data',train=True,download=True,transform=transform),batch_size=64,shuffle=True)\ntest_loader  = DataLoader(datasets.MNIST('./data',train=False,download=True,transform=transform),batch_size=64)\n\nclass CNN(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.f = nn.Sequential(nn.Conv2d(1,32,3,padding=1),nn.BatchNorm2d(32),nn.ReLU(),nn.MaxPool2d(2),nn.Conv2d(32,64,3,padding=1),nn.BatchNorm2d(64),nn.ReLU(),nn.MaxPool2d(2))\n        self.c = nn.Sequential(nn.Flatten(),nn.Linear(64*7*7,128),nn.ReLU(),nn.Dropout(0.5),nn.Linear(128,10))\n    def forward(self,x): return self.c(self.f(x))\n\nmodel = CNN()\nopt = optim.Adam(model.parameters(),lr=1e-3)\ncrit = nn.CrossEntropyLoss()\n\nfor epoch in range(2):\n    model.train()\n    for x,y in train_loader:\n        opt.zero_grad(); loss=crit(model(x),y); loss.backward(); opt.step()\n\nmodel.eval()\ncorrect = sum((model(x).argmax(1)==y).sum().item() for x,y in test_loader)\nprint(f"Accuracy: {correct/10000*100:.1f}%")`},
  {title:'Задача',xp:20,type:'task',description:'1. Добавь третий Conv слой с 128 фильтрами\n2. Попробуй CIFAR-10: from torchvision.datasets import CIFAR10\n   (3 канала RGB, другая нормализация)\n3. Нарисуй 5 неправильно классифицированных примеров\n4. Добавь LR scheduler:\n   scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.5)',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Что делает Conv2d?\n2. Зачем MaxPool2d?\n3. Почему weight sharing важен?\n4. Что такое BatchNorm?',code:null}
]},
{id:'cv3',trackId:'cv',title:'Transfer Learning',emoji:'🔄',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Transfer Learning — использование весов модели, обученной на большом датасете.\n\nПочему работает:\n• Ранние слои CNN — универсальные детекторы (края, текстуры)\n• Переобучать их не нужно\n\nСтратегии:\n1. Feature Extraction: заморозить всё кроме классификатора (мало данных)\n2. Fine-tuning: разморозить последние N слоёв с маленьким lr\n\nПопулярные модели (ImageNet):\n• ResNet18/50 — надёжный baseline\n• EfficientNet — лучший accuracy/размер\n• MobileNet — для мобильных\n• ViT — Vision Transformer, SotA',code:null},
  {title:'Код',xp:15,type:'code',description:'Transfer Learning на ResNet18:',code:`import torch, torch.nn as nn, torchvision.models as models\nimport torchvision.transforms as T\nfrom torchvision.datasets import CIFAR10\nfrom torch.utils.data import DataLoader,Subset\nimport torch.optim as optim\n\ntransform = T.Compose([T.Resize((224,224)),T.ToTensor(),T.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])])\ntrain_loader = DataLoader(Subset(CIFAR10('./data',train=True,download=True,transform=transform),range(2000)),batch_size=32,shuffle=True)\ntest_loader  = DataLoader(Subset(CIFAR10('./data',train=False,download=True,transform=transform),range(500)),batch_size=32)\n\nmodel = models.resnet18(weights='IMAGENET1K_V1')\nfor p in model.parameters(): p.requires_grad=False\nmodel.fc = nn.Linear(model.fc.in_features,10)\n\nopt = optim.Adam(model.fc.parameters(),lr=1e-3)\ncrit = nn.CrossEntropyLoss()\n\nfor epoch in range(3):\n    model.train(); total=0\n    for x,y in train_loader:\n        opt.zero_grad(); loss=crit(model(x),y); loss.backward(); opt.step(); total+=loss.item()\n    print(f"Epoch {epoch+1}: loss={total/len(train_loader):.3f}")\n\nmodel.eval()\ncorrect=sum((model(x).argmax(1)==y).sum().item() for x,y in test_loader)\nprint(f"Accuracy: {correct/500*100:.1f}%")`},
  {title:'Задача',xp:20,type:'task',description:'1. Разморозь последние 2 слоя ResNet (model.layer4) — сравни accuracy\n2. Попробуй EfficientNet: torchvision.models.efficientnet_b0()\n3. Сохрани и загрузи модель:\n   torch.save(model.state_dict(), "model.pth")\n   model.load_state_dict(torch.load("model.pth"))\n4. Напиши predict_image(model, image_path) → класс',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Почему Transfer Learning работает с маленьким датасетом?\n2. Зачем замораживать слои?\n3. Что такое fine-tuning?\n4. Почему нужна та же нормализация?',code:null}
]},
{id:'cv4',trackId:'cv',title:'Object Detection: YOLO',emoji:'🎯',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Object Detection — нахождение объектов + локализация (bounding box).\n\nClassification: что? → Detection: что + где?\n\nПодходы:\n• Two-stage (R-CNN, Faster R-CNN): регионы → классификация. Точнее, медленнее.\n• One-stage (YOLO, SSD): один проход. Быстрее, real-time.\n\nYOLO:\n• Делит изображение на сетку S×S\n• Каждая ячейка: B bounding boxes + confidence + C классов\n• NMS убирает дублирующиеся боксы\n\nМетрики:\n• IoU = площадь пересечения / площадь объединения\n• mAP — стандартная метрика detection\n\nYOLOv8 (Ultralytics) — современный стандарт:\npip install ultralytics',code:null},
  {title:'Код',xp:15,type:'code',description:'pip install ultralytics, затем набери:',code:`from ultralytics import YOLO\n\n# Загружаем YOLOv8n (nano — самая лёгкая)\nmodel = YOLO('yolov8n.pt')  # скачается автоматически\n\n# Детекция на тестовом изображении\nresults = model('https://ultralytics.com/images/zidane.jpg')\n\nresult = results[0]\nprint(f"Найдено объектов: {len(result.boxes)}")\nfor box in result.boxes:\n    cls_id = int(box.cls)\n    conf   = float(box.conf)\n    label  = model.names[cls_id]\n    coords = box.xyxy[0].tolist()\n    print(f"  {label}: {conf:.2f}, bbox={[round(c) for c in coords]}")\n\nresult.show()   # показывает изображение с боксами\n# result.save('output.jpg')  # сохраняет`},
  {title:'Задача',xp:20,type:'task',description:'1. Запусти на вебкамере:\n   model.predict(source=0, show=True)\n   Посмотри что детектируется вокруг\n2. Сравни yolov8n, yolov8s, yolov8m по скорости и качеству\n3. Подсчитай людей на каждом кадре видео:\n   result.boxes.cls (0 = person в COCO)\n4. Сохрани 10 кадров с person',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Чем detection отличается от классификации?\n2. Что такое IoU?\n3. Что такое NMS?\n4. Почему YOLO называется "You Only Look Once"?',code:null}
]},
{id:'cv5',trackId:'cv',title:'Комар-Лазер 🦟⚡',emoji:'⚔️',isBoss:true,steps:[
  {title:'Теория',xp:50,type:'theory',description:'⚔️ ФИНАЛЬНЫЙ БОСС: Computer Vision\n\n🦟⚡ ПРОЕКТ: Система обнаружения комаров\n\nПолный pipeline:\nСбор данных → Разметка → Обучение YOLO → Инференс → (опционально) деплой\n\nЧто нужно:\n1. Датасет: 200-500 изображений с комарами\n   • Kaggle: "mosquito detection dataset"\n   • Google Images\n   • Свои фото (макро-объектив или телефон)\n\n2. Разметка: bounding boxes вокруг комаров\n   • Roboflow (онлайн, бесплатно) — рекомендую\n   • LabelImg (локально)\n\n3. YOLO формат: файл .txt для каждого фото:\n   class_id center_x center_y width height (всё 0-1)\n\n4. Структура:\n   dataset/images/train/  images/val/\n   dataset/labels/train/  labels/val/\n   data.yaml\n\n5. data.yaml:\n   train: images/train\n   val: images/val\n   nc: 1\n   names: [\'mosquito\']\n\nМетрика успеха: mAP50 > 0.5',code:null},
  {title:'Код',xp:60,type:'code',description:'🚫 Без подсказок. Полный pipeline:\n1. Собери датасет (50+ фото, лучше 200+)\n2. Разметь через Roboflow или LabelImg\n3. Создай data.yaml\n4. Обучи YOLOv8:\n   model = YOLO("yolov8n.pt")\n   model.train(data="data.yaml", epochs=50, imgsz=640, batch=16)\n5. Посмотри метрики в results/\n6. Протестируй на новых фото\n\nНет GPU? → Google Colab (бесплатный T4) или epochs=20 на CPU',code:null},
  {title:'Задача',xp:60,type:'task',description:'🚫 Без подсказок:\n1. Запусти инференс на видео/вебкамере\n2. Нарисуй bounding boxes с confidence на каждом кадре\n3. Подсчитай комаров на кадр, найди пик активности\n4. (Бонус) Raspberry Pi + servo:\n   • Camera Module → YOLO детектирует комара\n   • Вычислить центр бокса\n   • Повернуть servo (GPIO) в направлении центра\n   • Это и есть система наведения 🦟⚡\n5. Что улучшил бы: больше данных? Аугментации?',code:null},
  {title:'Recall',xp:30,type:'recall',description:'За 5 минут:\n1. Pipeline от "хочу детектировать" до рабочей модели\n2. Сколько данных минимально? Как увеличить без новых фото?\n3. Что такое mAP50?\n4. Как улучшить если mAP < 0.3?\n5. Следующее направление: NLP, RL, или что-то ещё?',code:null}
]},
{id:'cv-p1',trackId:'cv',practice:true,emoji:'⚡',title:'Аугментации и inference',steps:[
  {title:'torchvision transforms',xp:15,type:'code',description:'Pipeline аугментаций для обучения',code:`import torch
import torchvision.transforms as T
from torchvision.datasets import FakeData
from torch.utils.data import DataLoader

# Обучение — много аугментаций
train_t = T.Compose([
    T.RandomHorizontalFlip(p=0.5),
    T.RandomRotation(degrees=15),
    T.RandomCrop(32, padding=4),
    T.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.2),
    T.ToTensor(),
    T.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

# Валидация — только нормализация (без случайных трансформаций!)
val_t = T.Compose([
    T.ToTensor(),
    T.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

dataset = FakeData(size=64, image_size=(3,32,32), transform=train_t)
loader  = DataLoader(dataset, batch_size=16, shuffle=True)
X, y    = next(iter(loader))
print(f'Batch: {X.shape}, min={X.min():.3f}, max={X.max():.3f}')`}
 ,{title:'Задача: аугментации',xp:20,type:'task',description:`1. Создай pipeline из 5+ аугментаций — объясни зачем каждая (против какого явления)\n2. Почему val_transform не содержит RandomFlip/Rotation? Что случится если добавить?\n3. Напиши show_augmented(img_tensor, transform, n=6) — покажи n версий одного изображения\n4. Обучи CNN на MNIST без аугментаций vs с (RandomRotation+RandomAffine) — test accuracy разная?`,code:null}
 ,{title:'Inference pipeline',xp:15,type:'code',description:'Сохранение модели и предсказание',code:`import torch
import torch.nn as nn
from torchvision.models import resnet18

# Создаём и сохраняем
model = resnet18(weights=None)
model.fc = nn.Linear(512, 10)
torch.save(model.state_dict(), 'model.pth')

# Загружаем
m2 = resnet18(weights=None)
m2.fc = nn.Linear(512, 10)
m2.load_state_dict(torch.load('model.pth', weights_only=True))
m2.eval()

# Inference на одном тензоре
def predict_tensor(model, tensor):
    with torch.no_grad():
        out   = model(tensor.unsqueeze(0))
        probs = torch.softmax(out, dim=1)
        return torch.argmax(probs).item(), probs.max().item()

dummy = torch.randn(3, 224, 224)
cls, conf = predict_tensor(m2, dummy)
print(f'Class: {cls}, Confidence: {conf:.4f}')`}
 ,{title:'Задача: inference',xp:20,type:'task',description:`1. Сохрани и загрузи обученную модель — убедись что predictions до и после совпадают\n2. Напиши predict_image(model, image_path) → (class_idx, confidence) для реального файла\n3. Batch inference: predict_batch(model, image_paths) — обработай список, верни DataFrame\n4. Замерь: inference одного изображения vs batch 32 — почему batch быстрее на GPU?`,code:null}
]}
);
