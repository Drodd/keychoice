// 游戏状态
let gameState = {
    currentScene: 'scene1',
    end_flag1: 0,
    end_flag2: 0,
    isGameStarted: false,
    preloadedImages: [],
    currentDate: new Date(2025, 5, 20), // 2025年6月20日
    isTransitioning: false
};

// 游戏情节数据
const gameData = {
    scene1: {
        image: 'img/plot1.png',
        text: '模拟考的成绩单像一幅抽象画。老师说它很有精神污染的潜力。我爸没说话，只是默默把阳台的窗户锁死了。我妈说，要不，咱出国吧。换个地方，换换风水。',
        useTransition: false, // 首个场景不需要转场
        choices: [
            {
                name: '参加高考，相信奇迹',
                effects: {
                    nextScene: 'scene2'
                },
                unlockCondition: null // 无条件，总是显示
            },
            {
                name: '听妈妈的话，出国',
                effects: {
                    nextScene: 'scene3'
                },
                unlockCondition: null
            }
        ]
    },
    scene2: {
        image: 'img/plot2.png',
        text: '奇迹没来。它可能在路上堵车了。我考上了一个二本，学校的名字我跟我爹说了三遍，他都没记住，最后挥挥手说：“挺好，至少是个大学。”但对你来说，那更像是个网吧。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene4'
                },
                unlockCondition: null
            }
        ]
    },
    scene3: {
        image: 'img/plot3.png',
        text: '于是我走了。机票是单程的。飞机穿过云层，下面是我住了十八年的城市。一片灰色的水泥森林，像个巨大的停车场。再见了，我的牢笼。窗外的天空很蓝。未来像一张崭新的彩票。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene4'
                },
                unlockCondition: null
            }
        ]
    },
    scene4: {
        image: 'img/plot4.png',
        text: '通勤地铁是个铁皮罐头。塞满了疲惫的沙丁鱼。我就是其中一条。离目的地还有三十分钟时，我面前出现个空位。',
        useTransition: true, // 重要的分支点，需要转场
        choices: [
            {
                name: '坐下',
                effects: {
                    nextScene: 'scene5',
                    flagChange: { end_flag1: 1 } // 大幅增加flag1
                },
                unlockCondition: null
            },
            {
                name: '站着',
                effects: {
                    nextScene: 'scene6',
                    flagChange: { end_flag2: 1 } // 大幅增加flag1
                },
                unlockCondition: null
            }
        ]
    },
    scene5: {
        image: 'img/plot5.png',
        text: '我决定坐下。就在那时，我看见了她，身穿一件干净的白大衣，直勾勾地看我……让我心神不宁，于是我走向她，然后朝另一节车厢去了。',
        useTransition: false, // 紧接上一个场景，不需要转场
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene7'
                },
                unlockCondition: null
            }
        ]
    },
    scene6: {
        image: 'img/plot6.png',
        text: '我选择站着，却被面前冒出的cosplay大叔吓得不轻。这个人多少脑子有点问题？也许是去参加漫展的吧？我不想关心，但那道视线还在，像粘在身上的口香糖。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene7'
                },
                unlockCondition: null
            }
        ]
    },
    scene7: {
        image: 'img/plot7.png',
        text: '我毕业了，也待业了。第一次认识到自己的渺小，简历投出去，像往海里扔漂流瓶。也许老天在提醒我需要继续深造？脑中突然闪过一丝邪念，也许创业才是我的宿命？',
        useTransition: true, // 时间跨度大（从大学到毕业），需要转场
        choices: [
            {
                name: '创业',
                effects: {
                    nextScene: 'scene8'
                },
                unlockCondition: null
            },
            {
                name: '读研',
                effects: {
                    nextScene: 'scene9'
                },
                unlockCondition: null
            }
        ]
    },
    scene8: {
        image: 'img/plot8.png',
        text: '我的项目叫“AI智能筷子”。它有什么用？不知道。但它有先进的大语言模型，能分析你的进食速度，还能在你夹到最后一块红烧肉时播放胜利的交响乐。投资人说这不是筷子，这是通往健康元宇宙的钥匙。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene10'
                },
                unlockCondition: null
            }
        ]
    },
    // 可以继续添加更多场景...
    scene9: {
        image: 'img/plot9.png',
        text: '我的导师是个奇人，他认为人类的未来不在星辰大海，而在餐桌方寸之间。他的课题是“AI筷子”，内置了先进大语言模型，确保每一块宫保鸡丁都能被以最优雅、最高效的方式送入嘴中。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene10'
                },
                unlockCondition: null
            }
        ]
    },
    scene10: {
        image: 'img/plot4.png',
        text: '通勤地铁依然是那个铁皮罐头。我还是那条沙丁鱼，只是现在穿着定制西装。我站在同样的位置。离目的地还有三十分钟时，我面前出现个空位。',
        useTransition: true, // 时间跨度很大（创业/读研成功后），需要转场
        choices: [
            {
                name: '坐下',
                effects: {
                    nextScene: 'scene11',
                    flagChange: { end_flag1: 1 } // 取当前的end_flag1的值加1
                },
                unlockCondition: { end_flag1: { lt: 1 } }//如果之前在scene4没有选择坐着
            },
            {
                name: '坐下',
                effects: {
                    nextScene: 'scene12',
                    flagChange: { end_flag1: 1 } // 取当前的end_flag1的值加1
                },
                unlockCondition: { end_flag1: { eq: 1 } }
            },
            {
                name: '站着',
                effects: {
                    nextScene: 'scene13', 
                    flagChange: { end_flag2: 1 } // 取当前的end_flag2的值加1
                },
                unlockCondition: { end_flag2: { lt: 1 } }//如果之前在scene4没有选择站着
            },
            {
                name: '站着',
                effects: {
                    nextScene: 'scene14',
                    flagChange: { end_flag2: 1 } // 取当前的end_flag2的值加1
                },
                unlockCondition: { end_flag2: { eq: 1 } }
            }
        ]
    },
    scene11: {
        image: 'img/plot5.png',
        text: '我决定坐下。就在那时，我看见了她，身穿一件干净的白大衣，直勾勾地看我……让我心神不宁，于是我走向她，然后朝另一节车厢去了。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene15'
                },
                unlockCondition: null
            }
        ]
    },
    scene12: {
        image: 'img/plot5.png',
        text: '我又看见了她，依然穿着白大褂。“我叫林，很高兴认识你。"她抢先开口，“我们的实验你可以拥有一切。想来体验一下吗？”我愣住了，这个诈骗把戏有些过于前卫，但是不影响我加她的微信。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene15'
                },
                unlockCondition: null
            }
        ]
    },
    scene13: {
        image: 'img/plot6.png',
        text: '我选择站着，却被面前冒出的cosplay大叔吓得不轻。这个人多少脑子有点问题？也许是去参加漫展的吧。我不想关心。但那道视线还在，像粘在身上的口香糖。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene15'
                },
                unlockCondition: null
            }
        ]
    },
    scene14: {
        image: 'img/plot6.png',
        text: '又看到了他。那个男人。还是那身行头，似乎从来没洗过。他径直朝我走过来，人群像摩西眼前的红海一样自动分开。“朋友，”他开口了，声音像砂纸磨过木头，“正确联盟需要你。”我心说大哥你可别说了，再说我就要报警了。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene15'
                },
                unlockCondition: null
            }
        ]
    },
    scene15: {
        image: 'img/plot10.png',
        text: '全球经济衰退，股市巨震，多米诺骨牌倒了。我不想回家，不想看我爸妈失望的眼神。不想解释我如何把他们的养老金变成了一堆漂亮的PPT和一地鸡毛。',
        choices: [
            {
                name: '继续',
                effects: {
                    nextScene: 'scene16'
                },
                unlockCondition: { 
                    end_flag1: { lt: 2 }, 
                    end_flag2: { lt: 2 } 
                }
            },
            {
                name: '继续',
                effects: {
                    nextScene: 'scene17'
                },
                unlockCondition: { end_flag1: { eq: 2 } }//如果之前在scene4和scene10都选择坐着
            },
            {
                name: '继续',
                effects: {
                    nextScene: 'scene18'
                },
                unlockCondition: { end_flag2: { eq: 2 } }//如果之前在scene4和scene10都选择站着
            }
        ]
    },
    scene16: {
        image: 'img/end1.png',
        text: '于是我上了山。方丈说，扫地，就是扫去心头的尘埃。他给了我一把扫帚。风吹过，新的叶子落下。我看着手里的扫帚，眼神一片茫然。',
        choices: [
            {
                name: '结局：扫地僧',
                effects: {
                    nextScene: 'endgame'
                },
                unlockCondition: null
            }
        ]
    },
    scene17: {
        image: 'img/end2.png',
        text: '我走投无路，翻出了那个叫林的微信。她没有骗我。在这里，我成了首富。我住在云端的数据宫殿里，俯瞰着由0和1构成的繁华都市。',
        choices: [
            {
                name: '结局：赛博首富',
                effects: {
                    nextScene: 'endgame'
                },
                unlockCondition: null
            }
        ]
    },
    scene18: {
        image: 'img/end3.png',
        text: '一个失眠的夜晚，窗外发出有节奏的敲击声，我打开窗，是那个男人。我知道这是我的宿命，正确联盟需要我，世界需要我。',
        choices: [
            {
                name: '结局：正确联盟',
                effects: {
                    nextScene: 'endgame'
                },
                unlockCondition: null
            }
        ]
    }
};

// 获取所有用到的图片路径
function getAllImagePaths() {
    const imagePaths = new Set();
    for (const sceneId in gameData) {
        const scene = gameData[sceneId];
        if (scene.image) {
            imagePaths.add(scene.image);
        }
    }
    return Array.from(imagePaths);
}

// 预加载图片
function preloadImages() {
    return new Promise((resolve) => {
        const imagePaths = getAllImagePaths();
        let loadedCount = 0;
        const totalCount = imagePaths.length;
        
        const preloadContainer = document.getElementById('preload-images');
        const progressBar = document.getElementById('loading-progress');
        const loadingIndicator = document.querySelector('.loading-indicator');
        
        // 显示加载指示器
        loadingIndicator.classList.add('show');
        
        if (totalCount === 0) {
            resolve();
            return;
        }
        
        imagePaths.forEach(imagePath => {
            const img = new Image();
            img.onload = img.onerror = () => {
                loadedCount++;
                const progress = (loadedCount / totalCount) * 100;
                progressBar.style.width = progress + '%';
                
                if (loadedCount === totalCount) {
                    // 延迟一点时间让用户看到100%完成
                    setTimeout(() => {
                        loadingIndicator.classList.remove('show');
                        document.getElementById('start-button').style.display = 'block';
                        resolve();
                    }, 500);
                }
            };
            img.src = imagePath;
            gameState.preloadedImages.push(img);
            preloadContainer.appendChild(img);
        });
    });
}

// 初始化首页
function initStartScreen() {
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none'; // 初始隐藏开始按钮
    
    // 重置游戏状态（包括日期）
    gameState.currentDate = new Date(2025, 5, 20);
    gameState.isTransitioning = false;
    gameState.end_flag1 = 0;
    gameState.end_flag2 = 0;
    
    // 预加载图片
    preloadImages().then(() => {
        // 图片加载完成后显示开始按钮
        startButton.addEventListener('click', startGame);
    });
}

// 开始游戏
async function startGame() {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    
    // 切换界面
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    
    // 初始化游戏状态
    gameState.isGameStarted = true;
    gameState.end_flag1 = 0;
    gameState.end_flag2 = 0;
    gameState.currentScene = 'scene1';
    gameState.currentDate = new Date(2025, 5, 20); // 重置日期到起始时间
    gameState.isTransitioning = false;
    
    // 显示开场黑幕和日期
    await showOpeningSequence();
    
    // 加载第一个场景
    await loadScene(gameState.currentScene);
}

// 开场序列：黑幕显示日期，然后淡出
async function showOpeningSequence() {
    const transitionOverlay = document.getElementById('transition-overlay');
    const dateDisplay = document.querySelector('.date-display');
    const dateText = document.getElementById('date-text');
    const storyContainer = document.getElementById('story-container');
    const choicesContainer = document.getElementById('choices-container');
    
    // 隐藏故事容器和选择容器
    storyContainer.style.opacity = '0';
    choicesContainer.style.opacity = '0';
    
    // 设置日期文本，使用固定格式
    function formatFixedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}年${month}月${day}日`;
    }
    
    dateText.textContent = formatFixedDate(gameState.currentDate) + '，高考前';
    
    // 显示黑幕和日期
    transitionOverlay.classList.add('show');
    dateDisplay.classList.add('show');
    
    // 等待3秒让用户看到日期
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 日期淡出
    dateDisplay.classList.remove('show');
    
    // 等待日期淡出完成
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 黑幕淡出
    transitionOverlay.classList.remove('show');
    
    // 等待黑幕淡出完成
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 恢复故事容器和选择容器的可见性
    storyContainer.style.opacity = '1';
    choicesContainer.style.opacity = '1';
}

// 初始化游戏
function initGame() {
    gameState.end_flag1 = 0;
    gameState.end_flag2 = 0;
    gameState.currentScene = 'scene1';
    gameState.currentDate = new Date(2025, 5, 20); // 重置日期到起始时间
    gameState.isTransitioning = false;
    updateUI();
}

// 更新UI显示
function updateUI() {
    document.getElementById('flag1-display').textContent = gameState.end_flag1;
    document.getElementById('flag2-display').textContent = gameState.end_flag2;
}

// 日期格式化函数
function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

// 日期滚动动画 - 改进版本，避免字符长度变化导致的视觉跳动
function animateDate(startDate, endDate, duration = 2000) {
    return new Promise((resolve) => {
        const dateText = document.getElementById('date-text');
        const startTime = Date.now();
        
        // 计算总天数差
        const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        let currentDays = 0;
        
        // 设置固定格式，避免字符长度变化
        function formatFixedDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}年${month}月${day}日`;
        }
        
        function updateDate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            // 计算当前应显示的天数（整数递增）
            const targetDays = Math.floor(totalDays * easeProgress);
            
            // 只在天数变化时更新显示，减少闪烁
            if (targetDays !== currentDays || progress === 1) {
                currentDays = targetDays;
                const currentDate = new Date(startDate);
                currentDate.setDate(currentDate.getDate() + currentDays);
                dateText.textContent = formatFixedDate(currentDate);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateDate);
            } else {
                // 确保最终显示正确的结束日期
                dateText.textContent = formatFixedDate(endDate);
                resolve();
            }
        }
        
        updateDate();
    });
}

// 逐字打印效果
function typewriterEffect(element, text, speed = 50) {
    return new Promise((resolve) => {
        element.textContent = '';
        let index = 0;
        
        function typeChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, speed);
            } else {
                resolve();
            }
        }
        
        typeChar();
    });
}

// 转场动画序列
async function transitionToScene(sceneId) {
    if (gameState.isTransitioning) return;
    gameState.isTransitioning = true;
    
    const scene = gameData[sceneId];
    if (!scene) {
        console.error('场景不存在:', sceneId);
        gameState.isTransitioning = false;
        return;
    }
    
    const storyContainer = document.getElementById('story-container');
    const choicesContainer = document.getElementById('choices-container');
    const transitionOverlay = document.getElementById('transition-overlay');
    const dateDisplay = document.querySelector('.date-display');
    const storyBubble = document.getElementById('story-bubble');
    
    // 1. 按钮和情节描述淡出 (0.5秒)
    storyContainer.classList.add('fade-out');
    choicesContainer.classList.add('fade-out');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 2. 黑幕淡入 (0.5秒)
    transitionOverlay.classList.add('show');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 3. 切换情节图片（在黑幕下方）
    document.getElementById('scene-image').src = scene.image;
    
    // 4. 更新日期并播放滚动动画 (2秒)
    const daysToAdd = Math.floor(Math.random() * 200) + 600; // 600-800天
    const oldDate = new Date(gameState.currentDate);
    gameState.currentDate.setDate(gameState.currentDate.getDate() + daysToAdd);
    
    dateDisplay.classList.add('show');
    await animateDate(oldDate, gameState.currentDate, 2000);
    
    // 5. 黑幕淡出 (0.5秒)
    transitionOverlay.classList.remove('show');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 6. 情节气泡入场和逐字打印，同时日期淡出
    storyContainer.classList.remove('fade-out');
    storyBubble.classList.remove('show');
    
    const storyText = document.getElementById('story-text');
    storyText.textContent = '';
    
    // 日期淡出
    dateDisplay.classList.remove('show');
    
    // 气泡入场
    setTimeout(() => {
        storyBubble.classList.add('show');
    }, 100);
    
    // 开始逐字打印
    const textLength = scene.text.length;
    const typingSpeed = Math.max(30, Math.min(80, 1500 / textLength)); // 根据文字长短调整速度
    
    await typewriterEffect(storyText, scene.text, typingSpeed);
    
    // 7. 显示选项入场动画 (0.5秒)
    choicesContainer.innerHTML = '';
    choicesContainer.classList.remove('fade-out');
    choicesContainer.classList.add('hidden');
    
    // 创建选项按钮
    const unlockedChoices = scene.choices.filter(choice => isChoiceUnlocked(choice));
    const maxChoices = 3;
    const displayChoices = unlockedChoices.slice(0, maxChoices);
    
    displayChoices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.name;
        button.onclick = () => handleChoice(choice);
        choicesContainer.appendChild(button);
    });
    
    // 选项入场
    setTimeout(() => {
        choicesContainer.classList.remove('hidden');
        choicesContainer.classList.add('show');
    }, 300);
    
    gameState.isTransitioning = false;
}

// 加载场景（用于首次加载，添加入场动画）
async function loadScene(sceneId) {
    const scene = gameData[sceneId];
    if (!scene) {
        console.error('场景不存在:', sceneId);
        return;
    }

    // 更新图片
    document.getElementById('scene-image').src = scene.image;
    
    // 更新文本
    const storyText = document.getElementById('story-text');
    const storyBubble = document.getElementById('story-bubble');
    const choicesContainer = document.getElementById('choices-container');
    
    // 初始化状态
    storyText.textContent = '';
    storyBubble.classList.remove('show');
    choicesContainer.classList.add('hidden');
    choicesContainer.innerHTML = '';
    
    // 气泡入场
    setTimeout(() => {
        storyBubble.classList.add('show');
    }, 100);
    
    // 逐字打印文本
    const textLength = scene.text.length;
    const typingSpeed = Math.max(30, Math.min(80, 1500 / textLength)); // 根据文字长短调整速度
    
    await typewriterEffect(storyText, scene.text, typingSpeed);
    
    // 创建选项按钮
    const unlockedChoices = scene.choices.filter(choice => isChoiceUnlocked(choice));
    const maxChoices = 3;
    const displayChoices = unlockedChoices.slice(0, maxChoices);
    
    displayChoices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-button';
        button.textContent = choice.name;
        button.onclick = () => handleChoice(choice);
        choicesContainer.appendChild(button);
    });
    
    // 选项入场动画
    setTimeout(() => {
        choicesContainer.classList.remove('hidden');
        choicesContainer.classList.add('show');
    }, 300);
}



// 检查选项是否解锁
function isChoiceUnlocked(choice) {
    if (!choice.unlockCondition) {
        return true; // 无条件，总是解锁
    }
    
    // 如果有or属性，使用OR逻辑
    if (choice.unlockCondition.or) {
        return choice.unlockCondition.or.some(condition => checkSingleCondition(condition));
    }
    
    // 如果有and属性，使用AND逻辑
    if (choice.unlockCondition.and) {
        return choice.unlockCondition.and.every(condition => checkSingleCondition(condition));
    }
    
    // 默认使用AND逻辑
    return checkSingleCondition(choice.unlockCondition);
}

// 检查单个条件
function checkSingleCondition(condition) {
    // 检查end_flag1条件
    if (condition.end_flag1) {
        const flag1Condition = condition.end_flag1;
        if (flag1Condition.gte && gameState.end_flag1 < flag1Condition.gte) return false;
        if (flag1Condition.lte && gameState.end_flag1 > flag1Condition.lte) return false;
        if (flag1Condition.eq && gameState.end_flag1 !== flag1Condition.eq) return false;
        if (flag1Condition.lt && gameState.end_flag1 >= flag1Condition.lt) return false;
        if (flag1Condition.gt && gameState.end_flag1 <= flag1Condition.gt) return false;
    }
    
    // 检查end_flag2条件
    if (condition.end_flag2) {
        const flag2Condition = condition.end_flag2;
        if (flag2Condition.gte && gameState.end_flag2 < flag2Condition.gte) return false;
        if (flag2Condition.lte && gameState.end_flag2 > flag2Condition.lte) return false;
        if (flag2Condition.eq && gameState.end_flag2 !== flag2Condition.eq) return false;
        if (flag2Condition.lt && gameState.end_flag2 >= flag2Condition.lt) return false;
        if (flag2Condition.gt && gameState.end_flag2 <= flag2Condition.gt) return false;
    }
    
    return true;
}

// 检查场景是否需要转场动画
function shouldUseTransition(sceneId) {
    const scene = gameData[sceneId];
    if (!scene) return false;
    
    // 如果场景明确指定了useTransition，使用该设置
    if (scene.hasOwnProperty('useTransition')) {
        return scene.useTransition;
    }
    
    // 默认行为：分析场景特征来决定是否需要转场
    // 连续性强的场景（如"继续"选项）通常不需要转场
    const currentScene = gameData[gameState.currentScene];
    if (currentScene && currentScene.choices) {
        const hasOnlyContinue = currentScene.choices.length === 1 && 
                               currentScene.choices[0].name === '继续';
        if (hasOnlyContinue) {
            return false; // 只有"继续"选项的场景不需要转场
        }
    }
    
    // 默认使用转场动画
    return true;
}

// 处理选项点击
function handleChoice(choice) {
    if (gameState.isTransitioning) return; // 防止在转场过程中点击
    
    const effects = choice.effects;
    
    // 处理flag变化
    if (effects.flagChange) {
        if (effects.flagChange.end_flag1) {
            gameState.end_flag1 += effects.flagChange.end_flag1;
        }
        if (effects.flagChange.end_flag2) {
            gameState.end_flag2 += effects.flagChange.end_flag2;
        }
        updateUI();
    }
    
    // 处理场景跳转
    if (effects.nextScene) {
        if (effects.nextScene === 'endgame') {
            showEndGameModal();
        } else {
            gameState.currentScene = effects.nextScene;
            
            // 根据场景配置决定是否使用转场动画
            if (shouldUseTransition(effects.nextScene)) {
                transitionToScene(effects.nextScene);
            } else {
                loadScene(effects.nextScene); // 直接加载场景，无转场
            }
        }
    }
}

// 显示结束游戏弹窗
function showEndGameModal() {
    document.getElementById('endgame-modal').style.display = 'block';
}

// 关闭弹窗
function closeModal() {
    document.getElementById('endgame-modal').style.display = 'none';
}

// 重新开始游戏
function restartGame() {
    closeModal();
    if (gameState.isGameStarted) {
        initGame();
    } else {
        // 如果游戏还没开始，回到首页
        const startScreen = document.getElementById('start-screen');
        const gameScreen = document.getElementById('game-screen');
        startScreen.style.display = 'block';
        gameScreen.style.display = 'none';
    }
}

// 页面加载完成后初始化首页
document.addEventListener('DOMContentLoaded', function() {
    initStartScreen();
});



// 添加键盘事件监听（可选）
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// 点击弹窗外部关闭弹窗（可选）
document.getElementById('endgame-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeModal();
    }
}); 