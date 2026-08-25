// 予約フォームの処理
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('booking-form');
    const confirmModal = document.getElementById('confirm-modal');
    const closeBtn = document.querySelector('.close');
    const confirmBtn = document.getElementById('confirm-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // フォーム送信イベント
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 駐車場が選択されているか確認
        const parking = getSelectedParking();
        if (!parking) {
            alert('駐車場を選択してください');
            return;
        }

        // フォームデータを取得
        const bookingData = {
            parkingId: parking.id,
            parkingName: parking.name,
            parkingPrice: parking.price,
            date: document.getElementById('booking-date').value,
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            phone: document.getElementById('user-phone').value,
            carNumber: document.getElementById('car-number').value,
            carType: document.getElementById('car-type').value,
            timestamp: new Date().toISOString()
        };

        // 日付が有効か確認
        const selectedDate = new Date(bookingData.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert('過去の日付は選択できません');
            return;
        }

        // 確認モーダルを表示
        showConfirmModal(bookingData);
    });

    // 確認モーダルを表示
    function showConfirmModal(bookingData) {
        const confirmDetails = document.getElementById('confirm-details');
        
        const detailsHTML = `
            <p><strong>駐車場：</strong> ${bookingData.parkingName}</p>
            <p><strong>予約日：</strong> ${formatDate(bookingData.date)}</p>
            <p><strong>ご氏名：</strong> ${bookingData.name}</p>
            <p><strong>メール：</strong> ${bookingData.email}</p>
            <p><strong>電話番号：</strong> ${bookingData.phone}</p>
            <p><strong>車のナンバー：</strong> ${bookingData.carNumber}</p>
            <p><strong>車種：</strong> ${bookingData.carType}</p>
            <p><strong>金額：</strong> ¥${bookingData.parkingPrice}</p>
        `;

        confirmDetails.innerHTML = detailsHTML;
        confirmModal.style.display = 'block';

        // 確認ボタンをクリック時
        confirmBtn.onclick = () => {
            // LocalStorageに予約データを保存
            localStorage.setItem('bookingData', JSON.stringify(bookingData));
            confirmModal.style.display = 'none';
            
            // 決済処理へ（簡略版では確認メッセージを表示）
            processBooking(bookingData);
        };
    }

    // モーダルを閉じる
    closeBtn.onclick = () => {
        confirmModal.style.display = 'none';
    };

    cancelBtn.onclick = () => {
        confirmModal.style.display = 'none';
    };

    // ウィンドウをクリック時にモーダルを閉じる
    window.onclick = (event) => {
        if (event.target === confirmModal) {
            confirmModal.style.display = 'none';
        }
    };
});

// 日付をフォーマット
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

// 予約処理
function processBooking(bookingData) {
    // ここで決済処理に進む（Stripe連携）
    showPaymentSection();
}

// 決済セクションを表示
function showPaymentSection() {
    // 予約フォームセクションを非表示
    document.getElementById('booking-section').style.display = 'none';
    document.getElementById('map-section').style.display = 'none';

    // 決済セクションを表示
    document.getElementById('payment-section').style.display = 'block';

    // ページをトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 成功メッセージを表示
function showSuccessMessage() {
    // 決済セクションを非表示
    document.getElementById('payment-section').style.display = 'none';

    // 成功メッセージを表示
    document.getElementById('success-section').style.display = 'block';

    // ページをトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 予約データを取得
function getBookingData() {
    const data = localStorage.getItem('bookingData');
    return data ? JSON.parse(data) : null;
}
