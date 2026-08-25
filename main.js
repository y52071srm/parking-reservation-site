/* ========================================
   八ヶ岳駐車場予約システム - メイン JavaScript
   ======================================== */

// セクション切り替え機能
function showSection(sectionId) {
    // 全てのセクションを非表示
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // 指定されたセクションを表示
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // ナビゲーションメニューのアクティブ状態を更新
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    // ページトップにスクロール
    window.scrollTo(0, 0);
}

// マイページのタブ切り替え
function setupMyPageTabs() {
    const menuLinks = document.querySelectorAll('.mypage-menu .menu-link');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const tabName = link.getAttribute('data-tab');
            
            // アクティブなリンクを更新
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // タブを切り替え
            const tabs = document.querySelectorAll('.mypage-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            const targetTab = document.getElementById(tabName + '-tab');
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

// 検索フォームの処理
function setupSearchForm() {
    const searchForm = document.getElementById('quick-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // 検索ページへ遷移
            showSection('search');
        });
    }
}

// 予約フォームの処理
function setupBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('予約・決済ページへ遷移します（実装予定）');
        });
    }
}

// フィルター関数
function applyFilters() {
    alert('フィルター検索を実行します（実装予定）');
}

function resetFilters() {
    document.getElementById('filter-area-search').value = '';
    document.getElementById('filter-date-search').value = '';
    document.getElementById('filter-price').value = '';
    document.querySelectorAll('input[name="facility"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    alert('フィルターをリセットしました');
}

// ページロード時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // デフォルトでホームセクションを表示
    showSection('home');
    
    // マイページのタブ機能をセットアップ
    setupMyPageTabs();
    
    // 検索フォームをセットアップ
    setupSearchForm();
    
    // 予約フォームをセットアップ
    setupBookingForm();

    // ナビゲーションメニューのクリックイベントを処理
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            showSection(section);
        });
    });

    // ホームのロゴをクリックしてホームセクションへ
    const navLogo = document.querySelector('.nav-logo a');
    if (navLogo) {
        navLogo.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('home');
        });
    }

    // 詳細ページのボタンをクリック時の処理
    const detailButtons = document.querySelectorAll('.btn-detail');
    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('detail');
        });
    });

    // 利用ガイドリンクをクリック時の処理
    const guideLinks = document.querySelectorAll('.link-more');
    guideLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('guide');
        });
    });

    console.log('八ヶ岳駐車場予約システム - 初期化完了');
});
