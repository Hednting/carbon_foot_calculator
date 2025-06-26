// 知识小问答题库
const quizData = [
  {
    question: "下列哪项属于碳足迹的直接排放？",
    options: [
      "家用燃油车行驶",
      "购买新衣服",
      "使用公共交通",
      "垃圾分类回收"
    ],
    answer: 0,
    explain: "家用燃油车行驶会直接燃烧燃油，产生温室气体，属于直接排放。"
  },
  {
    question: "减少碳足迹的有效做法是？",
    options: [
      "多吃牛羊肉",
      "优先步行或骑行",
      "频繁更换电子产品",
      "使用一次性塑料袋"
    ],
    answer: 1,
    explain: "步行和骑行零排放，是最环保的出行方式。"
  },
  {
    question: "碳足迹的单位通常是？",
    options: [
      "千克/吨二氧化碳当量",
      "千瓦时",
      "升/百公里",
      "人民币"
    ],
    answer: 0,
    explain: "碳足迹以温室气体排放量（CO₂e）计量，常用千克或吨。"
  },
  {
    question: "下列哪项行为有助于减少碳足迹？",
    options: [
      "购买快时尚产品",
      "减少食物浪费",
      "长时间开空调",
      "多用私家车"
    ],
    answer: 1,
    explain: "减少食物浪费能有效降低资源消耗和碳排放。"
  },
  {
    question: "全球食品系统约占温室气体排放的多少？",
    options: [
      "约5%",
      "约10%",
      "约26%",
      "约50%"
    ],
    answer: 2,
    explain: "全球食品系统贡献约26%的温室气体排放。"
  },
  {
    question: "下列哪种能源碳排放最低？",
    options: [
      "煤炭",
      "天然气",
      "风能",
      "汽油"
    ],
    answer: 2,
    explain: "风能属于可再生能源，几乎零碳排放。"
  },
  {
    question: "哪种生活习惯最有助于节能减排？",
    options: [
      "随手关灯",
      "长时间待机",
      "频繁洗热水澡",
      "开窗开空调"
    ],
    answer: 0,
    explain: "随手关灯、节约用电是最简单有效的节能减排方式。"
  },
  {
    question: "温室气体主要导致什么环境问题？",
    options: [
      "臭氧层空洞",
      "全球变暖",
      "酸雨",
      "水体富营养化"
    ],
    answer: 1,
    explain: "温室气体排放过多会导致全球变暖和气候变化。"
  },
  {
    question: "下列哪项属于绿色出行方式？",
    options: [
      "步行和骑行",
      "自驾燃油车",
      "打车",
      "乘坐飞机"
    ],
    answer: 0,
    explain: "步行和骑行零排放，是最绿色的出行方式。"
  },
  {
    question: "实现碳中和的目标主要是指？",
    options: [
      "减少所有能源消耗",
      "温室气体排放与吸收相抵消",
      "只用可再生能源",
      "停止工业生产"
    ],
    answer: 1,
    explain: "碳中和是指温室气体排放总量与吸收量相等，实现净零排放。"
  },
  {
    question: "下列哪项属于减少碳排放的绿色饮食习惯？",
    options: [
      "多吃红肉",
      "多吃本地时令蔬菜",
      "多喝含糖饮料",
      "经常点外卖"
    ],
    answer: 1,
    explain: "本地时令蔬菜运输距离短、碳排放低，是绿色饮食的好选择。"
  },
  {
    question: "下列哪种家用电器最应注意节能？",
    options: [
      "电视机",
      "空调",
      "电饭煲",
      "电风扇"
    ],
    answer: 1,
    explain: "空调耗电量大，合理设置温度、及时关闭可大幅节能减排。"
  },
  {
    question: "绿色出行的最佳方式是？",
    options: [
      "步行和骑行",
      "自驾燃油车",
      "拼车",
      "乘坐飞机"
    ],
    answer: 0,
    explain: "步行和骑行零排放，是最绿色的出行方式。"
  },
  {
    question: "下列哪项属于可再生能源？",
    options: [
      "煤炭",
      "石油",
      "太阳能",
      "天然气"
    ],
    answer: 2,
    explain: "太阳能、风能、水能等都是可再生能源，碳排放极低。"
  },
  {
    question: "减少一次性用品的使用有助于？",
    options: [
      "增加碳排放",
      "减少碳排放和垃圾",
      "提高生活成本",
      "促进塑料产业发展"
    ],
    answer: 1,
    explain: "减少一次性用品可降低资源消耗和碳排放，减少环境污染。"
  },
  {
    question: "下列哪项行为最有助于节约用水？",
    options: [
      "长时间冲澡",
      "及时关闭水龙头",
      "用水洗车",
      "频繁洗衣"
    ],
    answer: 1,
    explain: "及时关闭水龙头、杜绝浪费，是节水的关键。"
  },
  {
    question: "碳足迹计算器的主要作用是？",
    options: [
      "记录生活账单",
      "计算个人温室气体排放量",
      "查询天气预报",
      "统计人口数量"
    ],
    answer: 1,
    explain: "碳足迹计算器帮助用户了解自身碳排放，指导低碳生活。"
  },
  {
    question: "下列哪项属于低碳办公行为？",
    options: [
      "随手关灯关电脑",
      "打印大量文件",
      "长时间开空调",
      "频繁出差"
    ],
    answer: 0,
    explain: "随手关灯关电脑、减少纸张浪费是低碳办公的好习惯。"
  },
  {
    question: "下列哪种垃圾应优先回收？",
    options: [
      "厨余垃圾",
      "塑料瓶和纸张",
      "烟头",
      "灰尘"
    ],
    answer: 1,
    explain: "塑料瓶和纸张可回收再利用，减少资源浪费和碳排放。"
  },
  {
    question: "实现碳达峰、碳中和的意义是？",
    options: [
      "促进经济高碳发展",
      "改善环境、应对气候变化",
      "增加能源消耗",
      "提升温室气体排放"
    ],
    answer: 1,
    explain: "碳达峰、碳中和有助于改善环境、应对全球气候变化。"
  }
];

let currentQuiz = 0;
let selected = null;
let score = 0;
let finished = false;

// 固定顺序出题，每次10题
const QUIZ_PER_ROUND = 10;
let quizIndexes = [];
let usedQuizIndexes = [];

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getNextQuizIndex() {
  if (usedQuizIndexes.length >= Math.min(QUIZ_PER_ROUND, quizData.length)) return null;
  return quizIndexes[usedQuizIndexes.length];
}

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizSubmit = document.getElementById('quizSubmit');
const quizFeedback = document.getElementById('quizFeedback');
const quizNext = document.getElementById('quizNext');
const quizProgress = document.getElementById('quizProgress');

let quizState = 'answer'; // 'answer' or 'next' or 'finish'

function renderQuiz(idx) {
  finished = false;
  const q = quizData[idx];
  quizQuestion.textContent = q.question;
  quizOptions.innerHTML = '';
  quizFeedback.textContent = '';
  quizSubmit.disabled = false;
  selected = null;
  quizState = 'answer';
  quizSubmit.textContent = '提交答案';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = function() {
      document.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      btn.classList.add('selected');
      selected = i;
    };
    quizOptions.appendChild(btn);
  });
  quizProgress.textContent = `第 ${usedQuizIndexes.length} / ${Math.min(QUIZ_PER_ROUND, quizData.length)} 题`;
}

function renderResult() {
  finished = true;
  quizQuestion.textContent = '答题结束！';
  quizOptions.innerHTML = '';
  quizFeedback.innerHTML = `<span style='font-size:1.2rem;color:#1bbd7e;font-weight:bold;'>你的得分：${score} / ${Math.min(QUIZ_PER_ROUND, quizData.length)}</span><br>正确率：${Math.round(score/Math.min(QUIZ_PER_ROUND, quizData.length)*100)}%<br>${score>=8?"碳知识达人，继续加油！":score>=5?"不错哦，继续学习环保知识！":"欢迎多多学习环保知识！"}`;
  quizNext.style.display = 'none';
  quizSubmit.style.display = 'none';
  quizProgress.textContent = '';
  // 排行榜（本地最高分）
  let best = Number(localStorage.getItem('quizBest')||0);
  if(score > best) {
    best = score;
    localStorage.setItem('quizBest', best);
  }
  const board = document.createElement('div');
  board.className = 'quiz-leaderboard';
  board.innerHTML = `<div style='margin-top:18px;font-size:1.08rem;color:#176b43;'>历史最高分：<b>${best} / ${Math.min(QUIZ_PER_ROUND, quizData.length)}</b></div>`;
  quizFeedback.appendChild(board);
  // 重新挑战按钮
  const retry = document.createElement('button');
  retry.className = 'quiz-next';
  retry.textContent = '重新挑战';
  retry.onclick = function() {
    quizSubmit.style.display = '';
    startQuizRound();
  };
  quizFeedback.appendChild(retry);
}

function startQuizRound() {
  // 随机抽取10题
  quizIndexes = shuffle(quizData.map((_, i) => i)).slice(0, Math.min(QUIZ_PER_ROUND, quizData.length));
  usedQuizIndexes = [];
  score = 0;
  const idx = getNextQuizIndex();
  if (idx !== null) {
    usedQuizIndexes.push(idx);
    renderQuiz(idx);
  }
}

quizSubmit.onclick = function() {
  if (quizState === 'answer') {
    if (selected === null) {
      quizFeedback.textContent = '请选择一个答案';
      return;
    }
    const q = quizData[quizIndexes[usedQuizIndexes.length-1]];
    const opts = document.querySelectorAll('.quiz-option');
    opts.forEach((opt, i) => {
      opt.classList.remove('selected');
      if (i === q.answer) opt.classList.add('correct');
      else if (i === selected) opt.classList.add('incorrect');
    });
    if(selected === q.answer) score++;
    quizFeedback.textContent = selected === q.answer ? '回答正确！' : '回答错误：' + q.explain;
    quizSubmit.disabled = false;
    // 判断是否为最后一题
    if (usedQuizIndexes.length >= Math.min(QUIZ_PER_ROUND, quizData.length)) {
      quizState = 'finish';
      quizSubmit.textContent = '查看结果';
    } else {
      quizState = 'next';
      quizSubmit.textContent = '下一题';
    }
  } else if (quizState === 'next') {
    if (usedQuizIndexes.length >= Math.min(QUIZ_PER_ROUND, quizData.length)) {
      renderResult();
      return;
    }
    const idx = getNextQuizIndex();
    if (idx !== null) {
      usedQuizIndexes.push(idx);
      renderQuiz(idx);
    } else {
      renderResult();
    }
  } else if (quizState === 'finish') {
    renderResult();
  }
};

// 隐藏原 quizNext 按钮
quizNext.style.display = 'none';

// 初始化第一轮
startQuizRound(); 