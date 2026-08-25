// Stripe初期化
let stripe;
let cardElement;

document.addEventListener('DOMContentLoaded', () => {
    // Stripe公開キーを設定
    const stripePublicKey = 'YOUR_STRIPE_PUBLIC_KEY'; // 後で置き換える
    stripe = Stripe(stripePublicKey);

    // ただし、完全な Stripe 実装には バックエンド（サーバー）が必要なため、
    // ここでは簡略版（テスト決済）を実装
    
    const paymentBtn = document.getElementById('payment-btn');
    paymentBtn.addEventListener('click', processPayment);
});

// 決済処理（簡略版）
async function processPayment() {
    const bookingData = getBookingData();

    if (!bookingData) {
        alert('予約データが見つかりません');
        return;
    }

    // ボタンを無効化
    const paymentBtn = document.getElementById('payment-btn');
    const originalText = paymentBtn.innerHTML;
    paymentBtn.disabled = true;
    paymentBtn.textContent = '処理中...';

    try {
        // ここでは完全な Stripe 決済は実装せず、
        // 代わりに簡略版として決済をシミュレート

        // 実装時は下記のような処理が必要：
        // 1. バックエンドに決済を依頼
        // 2. バックエンドが Stripe で決済処理
        // 3. 成功時にメール送信
        // 4. フロントエンドに結果を返す

        // テスト用：1秒待って成功と判定
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 決済成功と仮定
        // メール送信（簡略版）
        await sendConfirmationEmail(bookingData);

        // 成功メッセージを表示
        showSuccessMessage();

        // 予約データをサーバーに送信（データベース保存用）
        await saveBookingToServer(bookingData);

    } catch (error) {
        console.error('決済エラー:', error);
        alert('決済処理中にエラーが発生しました。もう一度お試しください。');
        paymentBtn.disabled = false;
        paymentBtn.innerHTML = originalText;
    }
}

// メール送信（簡略版）
async function sendConfirmationEmail(bookingData) {
    try {
        // バックエンドのメール送信エンドポイント
        const response = await fetch('/api/send-confirmation-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: bookingData.email,
                name: bookingData.name,
                parkingName: bookingData.parkingName,
                date: bookingData.date,
                carNumber: bookingData.carNumber,
                price: bookingData.parkingPrice
            })
        });

        if (!response.ok) {
            // メール送信失敗時も続行（予約は成功）
            console.warn('メール送信に失敗しました');
        }
    } catch (error) {
        // ネットワークエラー等で失敗してもスキップ
        console.warn('メール送信に失敗:', error);
    }
}

// 予約データをサーバーに保存
async function saveBookingToServer(bookingData) {
    try {
        const response = await fetch('/api/save-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        });

        if (!response.ok) {
            console.warn('予約データの保存に失敗しました');
        }
    } catch (error) {
        console.warn('予約データの保存に失敗:', error);
    }
}

// 完全な Stripe 実装用の参考コード（後で実装）
/*
async function handleStripePayment(bookingData) {
    // 1. バックエンドに支払い意図を作成させる
    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            amount: bookingData.parkingPrice * 100, // cents
            email: bookingData.email
        })
    });

    const { clientSecret } = await response.json();

    // 2. Stripe カード要素から支払い方法を確認
    const { payment_method, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
    });

    if (error) {
        console.error(error);
        return;
    }

    // 3. 支払いを確認
    const confirmResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: payment_method.id
    });

    if (confirmResult.paymentIntent.status === 'succeeded') {
        // 支払い成功
        return true;
    } else {
        // 支払い失敗
        return false;
    }
}
*/
