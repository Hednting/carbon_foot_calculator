// ========== 碳足迹新版交互 ========== //
const carbonData = {
    food: {
        drink: [
            { key: 'milk', name: '牛奶', factor: 0.18, unit: 'kg/100ml', icon: './images/牛奶.png' },
            { key: 'soymilk', name: '豆奶', factor: 0.08, unit: 'kg/100ml', icon: './images/豆奶.png' },
            { key: 'hotdrink', name: '热饮', factor: 0.2, unit: 'kg/100ml', icon: './images/热饮.png' },
            { key: 'juice', name: '果汁', factor: 0.17, unit: 'kg/100ml', icon: './images/果汁.png' },
            { key: 'cola', name: '可乐软饮', factor: 0.07, unit: 'kg/100ml', icon: './images/可乐软饮.png' },
            { key: 'beer', name: '果酒/啤酒', factor: 0.14, unit: 'kg/100ml', icon: './images/果酒啤酒.png' },
            { key: 'liquor', name: '烈酒', factor: 0.23, unit: 'kg/100ml', icon: './images/烈酒.png' },
            { key: 'water', name: '饮用水', factor: 0.03, unit: 'kg/100ml', icon: './images/饮用水.png' }
        ],
        meat: [
            { key: 'pork', name: '猪肉', factor: 0.45, unit: 'kg/100g', icon: './images/猪肉.png' },
            { key: 'beef', name: '牛肉', factor: 2.7, unit: 'kg/100g', icon: './images/牛肉.png' },
            { key: 'chicken', name: '鸡肉', factor: 0.34, unit: 'kg/100g', icon: './images/鸡肉.png' },
            { key: 'egg', name: '鸡蛋', factor: 0.4, unit: 'kg/100g', icon: './images/鸡蛋.png' },
            { key: 'fish', name: '鱼', factor: 0.32, unit: 'kg/100g', icon: './images/鱼.png' }
        ],
        fruit: [
            { key: 'apple', name: '苹果', factor: 0.05, unit: 'kg/100g', icon: './images/苹果.png' },
            { key: 'banana', name: '香蕉', factor: 0.08, unit: 'kg/100g', icon: './images/香蕉.png' },
            { key: 'tomato', name: '番茄', factor: 0.04, unit: 'kg/100g', icon: './images/番茄.png' },
            { key: 'potato', name: '土豆', factor: 0.03, unit: 'kg/100g', icon: './images/土豆.png' },
            { key: 'leafy', name: '绿叶蔬菜', factor: 0.02, unit: 'kg/100g', icon: './images/绿叶蔬菜.png' }
        ],
        other: [
            { key: 'rice', name: '大米', factor: 0.27, unit: 'kg/100g', icon: './images/大米.png' },
            { key: 'noodle', name: '面条', factor: 0.19, unit: 'kg/100g', icon: './images/面条.png' },
            { key: 'bread', name: '面包', factor: 0.15, unit: 'kg/100g', icon: './images/面包.png' }
        ]
    },
    travel: {
        traffic: [
            { key: 'fuelcar', name: '家用燃油车', factor: 0.25, unit: 'kg/km', icon: './images/家用燃油车.png' },
            { key: 'evcar', name: '家用电动车', factor: 0.07, unit: 'kg/km', icon: './images/家用电动车.png' },
            { key: 'bus', name: '公共汽车', factor: 0.08, unit: 'kg/km', icon: './images/公共汽车.png' },
            { key: 'metro', name: '地铁', factor: 0.04, unit: 'kg/km', icon: './images/地铁.png' },
            { key: 'ebike', name: '电瓶自行车', factor: 0.01, unit: 'kg/km', icon: './images/电瓶自行车.png' },
            { key: 'bike', name: '自行车', factor: 0, unit: 'kg/km', icon: './images/自行车.png' },
            { key: 'walk', name: '步行', factor: 0, unit: 'kg/km', icon: './images/步行.png' }
        ]
    },
    utility: {
        home: [
            { key: 'electricity', name: '用电', factor: 0.785, unit: 'kg/度', icon: './images/用电.png' },
            { key: 'water', name: '用水', factor: 0.91, unit: 'kg/吨', icon: './images/用水.png' },
            { key: 'gas', name: '用气', factor: 0.19, unit: 'kg/立方', icon: './images/用气.png' },
            { key: 'waste', name: '垃圾排放', factor: 2.06, unit: 'kg/kg', icon: './images/垃圾排放.png' }
        ]
    }
};

let currentMain = 'food';
let currentSub = 'drink';

const mainBtns = document.querySelectorAll('.main-btn');
const carbonContent = document.getElementById('carbonContent');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const calcBtn = document.getElementById('calcBtn');
const resultDiv = document.getElementById('result');

// 全局保存所有输入项的值
const userInputs = {};

function renderSubMenu(main) {
    const subCategory = document.getElementById('subCategory');
    let html = '';
    if (main === 'food') {
        html += `<button class="sub-btn${currentSub==='drink'?' active':''}" data-sub="drink">饮品类</button>`;
        html += `<button class="sub-btn${currentSub==='meat'?' active':''}" data-sub="meat">肉蛋类</button>`;
        html += `<button class="sub-btn${currentSub==='fruit'?' active':''}" data-sub="fruit">果蔬类</button>`;
        html += `<button class="sub-btn${currentSub==='other'?' active':''}" data-sub="other">其他</button>`;
    } else if (main === 'travel') {
        html += `<button class="sub-btn active" data-sub="traffic">出行方式</button>`;
        currentSub = 'traffic';
    } else if (main === 'utility') {
        html += `<button class="sub-btn active" data-sub="home">家庭能耗</button>`;
        currentSub = 'home';
    }
    subCategory.innerHTML = html;
    bindSubBtnEvents();
}

function renderContent(main, sub, keyword = '') {
    // 全局搜索逻辑
    if (keyword && keyword.trim() !== '') {
        let allItems = [];
        const mainMap = { food: '食', travel: '行', utility: '用' };
        Object.keys(carbonData).forEach(mainKey => {
            Object.keys(carbonData[mainKey]).forEach(subKey => {
                carbonData[mainKey][subKey].forEach(item => {
                    if (item.name.includes(keyword)) {
                        allItems.push({ ...item, main: mainMap[mainKey], sub: subKey });
                    }
                });
            });
        });
        let html = `<h3>搜索结果</h3><div class="item-list">`;
        if (allItems.length === 0) {
            html += '<div style="color:#888;text-align:center;padding:30px 0;">暂无相关项目</div>';
        } else {
            allItems.forEach(item => {
                const val = userInputs[item.key] !== undefined ? userInputs[item.key] : 0;
                html += `<div class="item-row">
                    <span style='font-size:13px;color:#888;margin-right:8px;'>[${item.main}]</span>
                    <img src="${item.icon}" class="item-icon"> ${item.name} <span class="item-factor">${item.factor}${item.unit}</span> <input type="number" min="0" value="${val}" class="item-input" data-key="${item.key}"> ${item.unit.replace(/kg\/.*/, '')}
                </div>`;
            });
        }
        html += '</div>';
        carbonContent.innerHTML = '';
        carbonContent.innerHTML = html;
        // 绑定输入事件，实时保存到userInputs
        const inputs = carbonContent.querySelectorAll('.item-input');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                userInputs[this.getAttribute('data-key')] = this.value;
            });
        });
        return;
    }
    // 原有按主类/子类渲染逻辑
    let items = (carbonData[main] && carbonData[main][sub]) ? carbonData[main][sub] : [];
    let title = '';
    if (main === 'food') {
        if (sub === 'drink') title = '饮品类';
        if (sub === 'meat') title = '肉蛋类';
        if (sub === 'fruit') title = '果蔬类';
        if (sub === 'other') title = '其他';
    } else if (main === 'travel') {
        title = '出行方式';
    } else if (main === 'utility') {
        title = '家庭能耗';
    }
    let html = `<h3>${title}</h3><div class="item-list">`;
    if (items.length === 0) {
        html += '<div style="color:#888;text-align:center;padding:30px 0;">暂无相关项目</div>';
    } else {
        items.forEach(item => {
            const val = userInputs[item.key] !== undefined ? userInputs[item.key] : 0;
            html += `<div class="item-row">
                <img src="${item.icon}" class="item-icon"> ${item.name} <span class="item-factor">${item.factor}${item.unit}</span> <input type="number" min="0" value="${val}" class="item-input" data-key="${item.key}"> ${item.unit.replace(/kg\/.*/, '')}
            </div>`;
        });
    }
    html += '</div>';
    carbonContent.innerHTML = '';
    carbonContent.innerHTML = html;
    // 绑定输入事件，实时保存到userInputs
    const inputs = carbonContent.querySelectorAll('.item-input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            userInputs[this.getAttribute('data-key')] = this.value;
        });
    });
}

mainBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        mainBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentMain = this.getAttribute('data-main');
        // 控制二级菜单显示
        const subCategory = document.getElementById('subCategory');
        if (currentMain === 'food') {
            subCategory.style.display = '';
            renderSubMenu(currentMain); // 只有在food时才渲染
        } else {
            subCategory.style.display = 'none';
        }
        // 切换主类时，重置子类
        if (currentMain === 'food') currentSub = 'drink';
        if (currentMain === 'travel') currentSub = 'traffic';
        if (currentMain === 'utility') currentSub = 'home';
        renderContent(currentMain, currentSub, searchInput.value.trim());
    });
});

function bindSubBtnEvents() {
    const subBtns = document.querySelectorAll('.sub-btn');
    subBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            subBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSub = this.getAttribute('data-sub');
            renderContent(currentMain, currentSub, searchInput.value.trim());
        });
    });
}

searchBtn.addEventListener('click', function() {
    renderContent(currentMain, currentSub, searchInput.value.trim());
});
searchInput.addEventListener('input', function() {
    renderContent(currentMain, currentSub, searchInput.value.trim());
});

calcBtn.addEventListener('click', function() {
    // 统计所有大类下所有已输入项
    let total = 0;
    let detail = '';
    let foodSum = 0, travelSum = 0, utilitySum = 0;
    // 遍历三大类
    const allMain = ['food', 'travel', 'utility'];
    allMain.forEach(main => {
        let mainTotal = 0;
        let mainDetail = '';
        let subKeys = Object.keys(carbonData[main]);
        subKeys.forEach(sub => {
            let items = carbonData[main][sub];
            items.forEach(item => {
                let val = Number(userInputs[item.key] || 0);
                if (val > 0) {
                    let factor = item.factor;
                    let amount = val;
                    if (item.unit.includes('100ml') || item.unit.includes('100g')) {
                        amount = val / 100;
                    }
                    const emission = amount * factor;
                    mainTotal += emission;
                    mainDetail += `<tr><td>${item.name}</td><td>${emission.toFixed(2)} kgCO₂e</td></tr>`;
                }
            });
        });
        if (mainTotal > 0) {
            let mainTitle = main === 'food' ? '食' : main === 'travel' ? '行' : '用';
            detail += `<tr style='background:#f3f5f7;'><td colspan='2'><b>${mainTitle}小计：${mainTotal.toFixed(2)} kgCO₂e</b></td></tr>` + mainDetail;
        }
        if (main === 'food') foodSum = mainTotal;
        if (main === 'travel') travelSum = mainTotal;
        if (main === 'utility') utilitySum = mainTotal;
        total += mainTotal;
    });
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h3>碳足迹总计：</h3><table style="margin:0 auto;text-align:left;">${detail || '<tr><td>无有效输入</td></tr>'}<tr style="font-weight:bold;background:#e1e9e5;"><td>总计：</td><td>${total.toFixed(2)} kgCO₂e</td></tr></table>`;
    // 保存历史记录
    if (foodSum > 0 || travelSum > 0 || utilitySum > 0) {
        const now = new Date();
        const dateStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0') + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
        const record = {
            date: dateStr,
            food: foodSum.toFixed(2),
            travel: travelSum.toFixed(2),
            utility: utilitySum.toFixed(2),
            total: total.toFixed(2)
        };
        saveHistoryToServer(record).then(data => {
            if (data.success) {
                showEncourage(total);
            } else {
                alert('历史记录保存失败，请重试');
            }
        });
    }
});

// 鼓励语展示
function showEncourage(total) {
    const encourageDiv = document.createElement('div');
    encourageDiv.style = 'margin-top:18px;text-align:center;font-size:1.2em;color:#1bbd7e;';
    let msg = '';
    if (total < 5) msg = '很棒！你的碳足迹非常低，继续保持绿色生活！';
    else if (total < 20) msg = '做得不错，继续努力减少碳排放！';
    else msg = '每一次计算都是进步，加油为地球减碳！';
    encourageDiv.innerText = msg;
    resultDiv.appendChild(encourageDiv);
}

document.addEventListener('DOMContentLoaded', function() {
  // 只做欢迎用户名显示
  const loginBtn = document.getElementById('loginBtn');
  const currentUser = localStorage.getItem('currentUser');
  if (loginBtn && currentUser) {
    loginBtn.innerText = '欢迎，' + currentUser;
    loginBtn.disabled = true;
    loginBtn.style.background = '#0a5833';
    loginBtn.style.cursor = 'default';
  }
});

// 保存历史记录到后端
function saveHistoryToServer(record) {
    const username = localStorage.getItem('currentUser');
    if (!username) {
        console.log('用户未登录，无法保存历史记录');
        return Promise.resolve({success: false});
    }
    return fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...record, username })
    })
    .then(response => response.json())
    .then(data => {
        console.log('保存历史记录结果:', data);
        return data;
    })
    .catch(error => {
        console.error('保存历史记录出错:', error);
        return {success: false, msg: error};
    });
} 