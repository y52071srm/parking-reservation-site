// 駐車場データ
const parkings = [
    {
        id: 1,
        name: '赤岳山荘駐車場',
        lat: 35.8450,
        lng: 138.3234,
        price: 1000,
        description: '赤岳登山口 | 50台'
    },
    {
        id: 2,
        name: '八島湿原駐車場',
        lat: 35.9123,
        lng: 138.2456,
        price: 1000,
        description: '八島湿原 | 100台'
    }
];

let map;
let markers = [];
let selectedParking = null;

// マップ初期化
function initMap() {
    // マップの初期設定
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: 35.88, lng: 138.29 },
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: false,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            }
        ]
    });

    // マーカーを追加
    parkings.forEach(parking => {
        const marker = new google.maps.Marker({
            position: { lat: parking.lat, lng: parking.lng },
            map: map,
            title: parking.name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        markers.push(marker);

        // マーカークリック時のイベント
        marker.addListener('click', () => {
            selectParking(parking, marker);
        });
    });
}

// 駐車場を選択
function selectParking(parking, marker) {
    selectedParking = parking;

    // すべてのマーカーの色を青に戻す
    markers.forEach(m => {
        m.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
    });

    // 選択されたマーカーを赤に
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');

    // フォームにセット
    updateFormWithParking(parking);

    // マップを選択された駐車場に移動
    map.panTo({ lat: parking.lat, lng: parking.lng });
    map.setZoom(13);
}

// フォームを駐車場情報でアップデート
function updateFormWithParking(parking) {
    // 駐車場選択情報を表示
    document.getElementById('selected-parking-info').style.display = 'block';
    document.getElementById('selected-parking-name').textContent = parking.name;
    document.getElementById('selected-parking-price').textContent = parking.price;
    document.getElementById('form-selected-parking').textContent = parking.name;

    // 価格を更新
    document.getElementById('button-price').textContent = parking.price;
    document.getElementById('payment-price').textContent = parking.price;
}

// ページ読み込み時にマップを初期化
window.addEventListener('load', () => {
    // Google Maps API がロードされているか確認
    if (typeof google !== 'undefined') {
        initMap();
    } else {
        console.error('Google Maps API is not loaded');
        alert('Google Maps APIの読み込みに失敗しました。APIキーを確認してください。');
    }
});

// 選択された駐車場を取得（他のスクリプトから使用）
function getSelectedParking() {
    if (!selectedParking) {
        alert('駐車場を選択してください');
        return null;
    }
    return selectedParking;
}
