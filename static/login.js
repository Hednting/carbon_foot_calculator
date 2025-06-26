document.addEventListener('DOMContentLoaded', function() {
  // 登录弹窗交互
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeLogin = document.getElementById('closeLogin');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const registerForm = document.getElementById('registerForm');
  const registerError = document.getElementById('registerError');
  const loginPanel = document.getElementById('loginPanel');
  const registerPanel = document.getElementById('registerPanel');
  const toRegister = document.getElementById('toRegister');
  const toLogin = document.getElementById('toLogin');

  // 切换到注册
  if (toRegister) {
    toRegister.onclick = function(e) {
      e.preventDefault();
      loginPanel.style.display = 'none';
      registerPanel.style.display = 'block';
      loginError.style.display = 'none';
      registerError.style.display = 'none';
    };
  }
  // 切换到登录
  if (toLogin) {
    toLogin.onclick = function(e) {
      e.preventDefault();
      loginPanel.style.display = 'block';
      registerPanel.style.display = 'none';
      loginError.style.display = 'none';
      registerError.style.display = 'none';
    };
  }

  // 注册逻辑（走后端接口）
  if (registerForm) {
    registerForm.onsubmit = function(e) {
      e.preventDefault();
      const username = document.getElementById('regUsername').value.trim();
      const password = document.getElementById('regPassword').value.trim();
      if (!username || !password) {
        registerError.innerText = '用户名和密码不能为空';
        registerError.style.display = 'block';
        return;
      }
      fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // 注册成功后自动登录
          fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              localStorage.setItem('currentUser', username);
              loginModal.style.display = 'none';
              alert('注册并登录成功！');
              window.location.reload();
            } else {
              registerError.innerText = '注册成功但自动登录失败，请手动登录';
              registerError.style.display = 'block';
            }
          });
        } else {
          registerError.innerText = data.msg || '注册失败';
          registerError.style.display = 'block';
        }
      })
      .catch(() => {
        registerError.innerText = '注册请求失败';
        registerError.style.display = 'block';
      });
    };
  }

  // 登录逻辑（走后端接口）
  if (loginForm) {
    loginForm.onsubmit = function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('currentUser', username);
          loginModal.style.display = 'none';
          alert('登录成功！');
          window.location.reload();
        } else {
          loginError.innerText = data.msg || '用户名或密码错误';
          loginError.style.display = 'block';
        }
      })
      .catch(() => {
        loginError.innerText = '登录请求失败';
        loginError.style.display = 'block';
      });
    };
  }

  // 自动登录/自动填充
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    if (loginBtn && loginModal) {
      loginBtn.innerText = '欢迎，' + currentUser;
      loginBtn.disabled = false;
      loginBtn.style.background = '#0a5833';
      loginBtn.style.cursor = 'pointer';
      loginBtn.onclick = function() {
        loginModal.style.display = 'flex';
        // 切换到登录面板
        if (loginPanel && registerPanel) {
          loginPanel.style.display = 'block';
          registerPanel.style.display = 'none';
        }
        if (loginError) loginError.style.display = 'none';
        if (registerError) registerError.style.display = 'none';
        // 自动填充用户名
        if (document.getElementById('username')) {
          document.getElementById('username').value = '';
        }
      };
    }
    if (document.getElementById('username')) {
      document.getElementById('username').value = currentUser;
    }
  } else {
    if (loginBtn && loginModal) {
      loginBtn.innerText = '登录';
      loginBtn.disabled = false;
      loginBtn.style.background = '#0a5833';
      loginBtn.style.cursor = 'pointer';
      loginBtn.onclick = function() {
        loginModal.style.display = 'flex';
        if (loginPanel && registerPanel) {
          loginPanel.style.display = 'block';
          registerPanel.style.display = 'none';
        }
        if (loginError) loginError.style.display = 'none';
        if (registerError) registerError.style.display = 'none';
        if (document.getElementById('username')) {
          document.getElementById('username').value = '';
        }
      };
    }
  }

  if (loginBtn && loginModal && closeLogin) {
    loginBtn.onclick = function() {
      loginModal.style.display = 'flex';
      loginError && (loginError.style.display = 'none');
      registerError && (registerError.style.display = 'none');
      // 自动填充用户名
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser && document.getElementById('username')) {
        document.getElementById('username').value = currentUser;
      }
    };
    closeLogin.onclick = function() {
      loginModal.style.display = 'none';
    };
    // 点击弹窗外关闭
    window.onclick = function(event) {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
      }
    };
  }
}); 