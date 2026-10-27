// GS25 CRM Loyalty Application - 100% GS25 Vietnam App Logic & Simulator Controls
document.addEventListener('DOMContentLoaded', () => {

  // --- APPLICATION STATE ---
  const state = {
    activePage: 'home-screen',
    tulanhTab: 'storage',
    userStamps: 10, // Initial demo: 10 stamps (ready for mốc 10 tem Hộp Quà Happy Fridge)
    userPoints: 9500,
    condBill: false,
    condSponsor: false,
    selectedBagMilestone: 10,
    item10Reward: {
      id: 'i10_fridge',
      title: 'Hộp Quà Happy Fridge Đặc Biệt',
      val: 'Trị giá 150.000 VNĐ (Mở tại quầy GS25)',
      icon: 'fa-solid fa-box-archive',
      tag: 'HAPPY FRIDGE 👑'
    },
    rewardStock: {
      10: { south: 5, north: 3 }
    },
    selectedRegion: 'Miền Nam',
    currentStoreRegionTab: 'south',
    cardBalance: 120000,
    selectedCardId: '20002',
    selectedCardName: 'GS25 Standard 200K',
    cardHeroClass: 'black-hero',
    currentDetail: null,
    myGifts: [
      {
        id: 1,
        title: 'Trà Xanh Youus Boseong Green Tea Iced Tea 340ml',
        exp: 'Hạn đổi 30/6/25',
        bgClass: 'coca-bg',
        tag: 'SĂN COCA',
        subTitle: 'NHẬN QUÀ COOL'
      },
      {
        id: 2,
        title: 'GS25 tặng bạn Panna Cotta kiwi hoặc dâu trị giá 15k',
        exp: 'Hạn đổi 30/6/25',
        bgClass: 'chill-bg',
        tag: 'BỮA XẾ CHILL',
        subTitle: 'PANNA COTTA 15K'
      },
      {
        id: 3,
        title: 'GS25 tặng bạn 1 chai nước mơ trị giá 25k',
        exp: 'Hạn đổi 30/6/25',
        bgClass: 'mo-bg',
        tag: 'MƠ ĐI ELM',
        subTitle: 'NƯỚC MƠ 25K'
      }
    ],
    txnLogs: [
      { type: 'debit', title: 'Thanh toán E-Gift Card tại GS25 Nguyễn Gian Thanh', date: '16/08/2026 21:38', amount: -400000 },
      { type: 'credit', title: 'Nạp tiền tại quầy POS Thẻ E-Gift 500k (+20k Bonus 4%)', date: '15/08/2026 10:15', amount: 520000 }
    ],
    qrTimeLeft: 15,
    qrTimerInterval: null
  };

  // --- DOM ELEMENTS ---
  const appPages = document.querySelectorAll('.app-page');
  const topSwitchBtns = document.querySelectorAll('.switch-btn[data-target]');
  const bottomNavTabs = document.querySelectorAll('.nav-tab[data-nav]');

  // Home Screen Elements
  const homeOpenQrBtn = document.getElementById('homeOpenQrBtn');
  const quickDealsBtn = document.getElementById('quickDealsBtn');
  const quickRewardsBtn = document.getElementById('quickRewardsBtn');
  const quickCardsBtn = document.getElementById('quickCardsBtn');
  const seeAllDealsBtn = document.getElementById('seeAllDealsBtn');
  const seeAllRewardsBtn = document.getElementById('seeAllRewardsBtn');
  const openStampGameCard = document.getElementById('openStampGameCard');
  const storageSeeAllBtn = document.getElementById('storageSeeAllBtn');
  const storageUseBtn = document.getElementById('storageUseBtn');
  const viewPointsDetailBtn = document.getElementById('viewPointsDetailBtn');

  // Webview Back Buttons
  const backToHomeFromStamp = document.getElementById('backToHomeFromStamp');
  const backToHomeFromCard = document.getElementById('backToHomeFromCard');
  const backToHomeFromFridge = document.getElementById('backToHomeFromFridge');

  // Deals & News Screen
  const tabDealsBtn = document.getElementById('tabDealsBtn');
  const tabNewsBtn = document.getElementById('tabNewsBtn');
  const dealsGridPanel = document.getElementById('dealsGridPanel');
  const newsGridPanel = document.getElementById('newsGridPanel');
  const filterPills = document.querySelectorAll('.filter-pill');

  // Floating Action Widget
  const floatingPromoWidget = document.getElementById('floatingPromoWidget');
  const closeFloatingWidgetBtn = document.getElementById('closeFloatingWidgetBtn');
  const openFloatingQrBtn = document.getElementById('openFloatingQrBtn');

  // Stamp Game DOM
  const userTotalStampsDisplay = document.getElementById('userTotalStampsDisplay');
  const stampGrid = document.getElementById('stampGrid');
  const boardOverfillBadge = document.getElementById('boardOverfillBadge');
  const condBillCard = document.getElementById('condBillCard');
  const condSponsorCard = document.getElementById('condSponsorCard');
  const condBillCheck = document.getElementById('condBillCheck');
  const condSponsorCheck = document.getElementById('condSponsorCheck');
  const btnEarnStamp = document.getElementById('btnEarnStamp');
  const earnStampHint = document.getElementById('earnStampHint');

  // Progress Bar DOM
  const stampProgressFill = document.getElementById('stampProgressFill');
  const progressNode10 = document.getElementById('progressNode10');
  const progressNodeOverflow = document.getElementById('progressNodeOverflow');
  const progressOverflowCount = document.getElementById('progressOverflowCount');
  const progCurrentLabel = document.getElementById('progCurrentLabel');

  // Milestone 10 TEM DOM (Chương trình chỉ có 10 TEM đổi quà Hộp Quà Happy Fridge)
  const milestoneActionCard10 = document.getElementById('milestoneActionCard10');
  const milestoneClaimBtn10 = document.getElementById('milestoneClaimBtn10');
  const m10StampCountLabel = document.getElementById('m10StampCountLabel');
  const m10ProgressStatusText = document.getElementById('m10ProgressStatusText');
  const m10MiniSlotsRow = document.getElementById('m10MiniSlotsRow');

  // Store List DOM Elements (Store List.jpg & Store List - Expand.jpg)
  const openStoreListBtn = document.getElementById('openStoreListBtn');
  const backToStampFromStoreList = document.getElementById('backToStampFromStoreList');
  const tabStoreSouth = document.getElementById('tabStoreSouth');
  const tabStoreNorth = document.getElementById('tabStoreNorth');
  const storeGiftCardsContainer = document.getElementById('storeGiftCardsContainer');
  const storeListHelpBtn = document.getElementById('storeListHelpBtn');

  // Store Map Modal DOM
  const storeMapModal = document.getElementById('storeMapModal');
  const mapModalStoreName = document.getElementById('mapModalStoreName');
  const mapModalAddress = document.getElementById('mapModalAddress');
  const mapModalStock = document.getElementById('mapModalStock');
  const btnOpenGoogleMaps = document.getElementById('btnOpenGoogleMaps');
  const btnCloseStoreMapModal = document.getElementById('btnCloseStoreMapModal');

  // Simulator helper buttons
  const simResetStampsBtn = document.getElementById('simResetStampsBtn');
  const simQuickAdd1Btn = document.getElementById('simQuickAdd1Btn');
  const simQuickAdd5Btn = document.getElementById('simQuickAdd5Btn');
  const simQuickAdd10Btn = document.getElementById('simQuickAdd10Btn');
  const simQuickAdd12Btn = document.getElementById('simQuickAdd12Btn');

  // Confirmation Modal DOM (100% GS25 style)
  const redeemConfirmModal = document.getElementById('redeemConfirmModal');
  const confirmModalTitle = document.getElementById('confirmModalTitle');
  const confirmModalSub = document.getElementById('confirmModalSub');
  const confirmStampVisualIcon = document.getElementById('confirmStampVisualIcon');
  const confirmStampVisualQty = document.getElementById('confirmStampVisualQty');
  const confirmGiftVisualIcon = document.getElementById('confirmGiftVisualIcon');
  const confirmGiftVisualTag = document.getElementById('confirmGiftVisualTag');
  const confirmRewardName = document.getElementById('confirmRewardName');
  const confirmDeductStamps = document.getElementById('confirmDeductStamps');
  const confirmItemSelectWrapper = document.getElementById('confirmItemSelectWrapper');
  const compactGiftPicker = document.getElementById('compactGiftPicker');
  const btnConfirmExchange = document.getElementById('btnConfirmExchange');
  const btnCancelExchange = document.getElementById('btnCancelExchange');

  // Region Selection Modal DOM (Miền Nam / Miền Bắc)
  const redeemRegionModal = document.getElementById('redeemRegionModal');
  const regionModalTitle = document.getElementById('regionModalTitle');
  const regionModalSub = document.getElementById('regionModalSub');
  const regionRewardNameDisplay = document.getElementById('regionRewardNameDisplay');
  const btnRegionSouth = document.getElementById('btnRegionSouth');
  const btnRegionNorth = document.getElementById('btnRegionNorth');
  const btnBackFromRegion = document.getElementById('btnBackFromRegion');

  // Out of Stock Modal DOM (Case 2)
  const outOfStockModal = document.getElementById('outOfStockModal');
  const outOfStockTitle = document.getElementById('outOfStockTitle');
  const outOfStockDesc = document.getElementById('outOfStockDesc');
  const outOfStockRegionName = document.getElementById('outOfStockRegionName');
  const btnChooseOtherRegion = document.getElementById('btnChooseOtherRegion');
  const btnCloseOutOfStock = document.getElementById('btnCloseOutOfStock');

  // Stock Simulation Buttons
  const simStockBoth = document.getElementById('simStockBoth');
  const simStockNoSouth = document.getElementById('simStockNoSouth');
  const simStockNoNorth = document.getElementById('simStockNoNorth');
  const simStockNone = document.getElementById('simStockNone');

  // Success Modal DOM (Clean GS25 Success)
  const redeemSuccessModal = document.getElementById('redeemSuccessModal');
  const successItemIcon = document.getElementById('successItemIcon');
  const successBagSourceTag = document.getElementById('successBagSourceTag');
  const successItemTitle = document.getElementById('successItemTitle');
  const successItemValue = document.getElementById('successItemValue');
  const successDestinationNotice = document.getElementById('successDestinationNotice');
  const stayStampGameBtn = document.getElementById('stayStampGameBtn');

  // E-Gift Card Sub-Views DOM
  const egiftCardListView = document.getElementById('egift-card-list-view');
  const egiftCardDetailView = document.getElementById('egift-card-detail-view');
  const backToCardCatalogBtn = document.getElementById('backToCardCatalogBtn');
  const openCardDetailDirectBtn = document.getElementById('openCardDetailDirectBtn');
  const scrollToTncBtn = document.getElementById('scrollToTncBtn');
  const tncDetailsBox = document.getElementById('tncDetailsBox');
  const cardTncCheck = document.getElementById('cardTncCheck');
  const payFromDetailBtn = document.getElementById('payFromDetailBtn');

  const realCards = document.querySelectorAll('.gs25-real-card');
  const detailCardGraphic = document.getElementById('detailCardGraphic');
  const detailCardCode = document.getElementById('detailCardCode');
  const detailInitialVal = document.getElementById('detailInitialVal');
  const detailCardRemaining = document.getElementById('detailCardRemaining');
  const detailTxnList = document.getElementById('detailTxnList');

  const showPosQrBtn = document.getElementById('showPosQrBtn');
  const posTopup100Btn = document.getElementById('posTopup100Btn');
  const posTopup200Btn = document.getElementById('posTopup200Btn');
  const posTopup300Btn = document.getElementById('posTopup300Btn');
  const posTopup500Btn = document.getElementById('posTopup500Btn');

  // Tủ Lạnh 25 DOM
  const tabMyStorage = document.getElementById('tabMyStorage');
  const tabMyGift = document.getElementById('tabMyGift');
  const panelMyStorage = document.getElementById('panelMyStorage');
  const panelMyGift = document.getElementById('panelMyGift');
  const myGiftsListContainer = document.getElementById('myGiftsListContainer');
  const myGiftBadge = document.getElementById('myGiftBadge');
  const fridgeBadgeCount = document.getElementById('fridgeBadgeCount');
  const tulanhUseBtns = document.querySelectorAll('.tulanh-use-btn');

  // Modals & Toast
  const rewardDetailModal = document.getElementById('rewardDetailModal');
  const closeRewardDetailModalBtn = document.getElementById('closeRewardDetailModalBtn');
  const confirmRedeemBtn = document.getElementById('confirmRedeemBtn');
  const detailHeroTitle = document.getElementById('detailHeroTitle');
  const detailExpDate = document.getElementById('detailExpDate');
  const detailItemTitle = document.getElementById('detailItemTitle');
  const detailPointBadge = document.getElementById('detailPointBadge');
  const detailUserPts = document.getElementById('detailUserPts');

  const payModal = document.getElementById('payModal');
  const openPayModalBtn = document.getElementById('openPayModalBtn');
  const closePayModalBtn = document.getElementById('closePayModalBtn');
  const closePayModalBtn2 = document.getElementById('closePayModalBtn2');
  const modalCardBalance = document.getElementById('modalCardBalance');
  const modalCardTitle = document.getElementById('modalCardTitle');

  const fridgeInfoModal = document.getElementById('fridgeInfoModal');
  const openFridgeInfoModalBtn = document.getElementById('openFridgeInfoModalBtn');
  const closeFridgeInfoModalBtn = document.getElementById('closeFridgeInfoModalBtn');
  const closeFridgeInfoModalBtn2 = document.getElementById('closeFridgeInfoModalBtn2');

  const txnModal = document.getElementById('txnModal');
  const openTxnHistoryBtn = document.getElementById('openTxnHistoryBtn');
  const closeTxnModalBtn = document.getElementById('closeTxnModalBtn');
  const txnList = document.getElementById('txnList');

  const toastNoti = document.getElementById('toastNoti');
  const toastMsg = document.getElementById('toastMsg');
  const qrCountdown = document.getElementById('qrCountdown');
  const refreshQrBtn = document.getElementById('refreshQrBtn');

  // --- STORE LIST DATA (100% REPLICA Store List.jpg & Store List - Expand.jpg) ---
  const storeListData = {
    south: [
      {
        id: 'sg_south_1',
        title: 'Hộp Quà Happy Fridge: Phiên Bản Mùa Hè Rực Rỡ',
        desc: 'Hộp quà đặc biệt tích hợp các sản phẩm độc quyền GS25',
        bgClass: 'gift-box-bg',
        icon: 'fa-solid fa-box-archive',
        stock: 'Còn 1.000 cái',
        stores: [
          { name: 'GS25 240 Bùi Viện', addr: '240 Bùi Viện, Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh', stock: 'Còn 100 cái' },
          { name: 'GS25 Trần Nhật Duật, Q.1', addr: '32 Trần Nhật Duật, Phường Tân Định, Quận 1, TP. Hồ Chí Minh', stock: 'Còn 20 cái' },
          { name: 'GS25 Landmark 81, Bình Thạnh', addr: 'Tầng B1, Vinhomes Central Park, Quận Bình Thạnh, TP. Hồ Chí Minh', stock: 'Còn 50 cái' },
          { name: 'GS25 Thảo Điền, TP. Thủ Đức', addr: '12 Quốc Hương, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh', stock: 'Còn 80 cái' },
          { name: 'GS25 Phan Xích Long, Phú Nhuận', addr: '158 Phan Xích Long, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh', stock: 'Còn 45 cái' },
          { name: 'GS25 Sư Vạn Hạnh, Q.10', addr: '824 Sư Vạn Hạnh, Phường 12, Quận 10, TP. Hồ Chí Minh', stock: 'Còn 60 cái' },
          { name: 'GS25 Nguyễn Thị Minh Khai, Q.3', addr: '18B Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh', stock: 'Còn 75 cái' },
          { name: 'GS25 Võ Văn Ngân, TP. Thủ Đức', addr: '216 Võ Văn Ngân, Phường Bình Thọ, TP. Thủ Đức, TP. Hồ Chí Minh', stock: 'Còn 90 cái' },
          { name: 'GS25 Hoàng Hoa Thám, Tân Bình', addr: '34 Hoàng Hoa Thám, Phường 12, Quận Tân Bình, TP. Hồ Chí Minh', stock: 'Còn 30 cái' },
          { name: 'GS25 Phạm Văn Đồng, Gò Vấp', addr: '412 Phạm Văn Đồng, Phường 11, Quận Gò Vấp, TP. Hồ Chí Minh', stock: 'Còn 55 cái' }
        ]
      },
      {
        id: 'sg_south_2',
        title: 'Bình "Giữ Nhiệt" Happy Fridge Youus',
        desc: 'Bình nước inox cao cấp 500ml giữ nóng lạnh 24h',
        bgClass: 'tumbler-bg',
        icon: 'fa-solid fa-bottle-water',
        stock: 'Còn 500 cái',
        stores: [
          { name: 'GS25 240 Bùi Viện', addr: '240 Bùi Viện, Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh', stock: 'Còn 60 cái' },
          { name: 'GS25 Landmark 81, Bình Thạnh', addr: 'Tầng B1, Vinhomes Central Park, Quận Bình Thạnh, TP. Hồ Chí Minh', stock: 'Còn 40 cái' },
          { name: 'GS25 Thảo Điền, TP. Thủ Đức', addr: '12 Quốc Hương, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh', stock: 'Còn 50 cái' },
          { name: 'GS25 Sư Vạn Hạnh, Q.10', addr: '824 Sư Vạn Hạnh, Phường 12, Quận 10, TP. Hồ Chí Minh', stock: 'Còn 35 cái' },
          { name: 'GS25 Phan Xích Long, Phú Nhuận', addr: '158 Phan Xích Long, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh', stock: 'Còn 30 cái' }
        ]
      },
      {
        id: 'sg_south_3',
        title: 'Túi Tote Canvas: Hoà Bình Đẹp Lắm',
        desc: 'Túi vải canvas thời trang phiên bản kỉ niệm GS25',
        bgClass: 'tote-bg',
        icon: 'fa-solid fa-bag-shopping',
        stock: 'Còn 300 cái',
        stores: [
          { name: 'GS25 240 Bùi Viện', addr: '240 Bùi Viện, Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh', stock: 'Còn 40 cái' },
          { name: 'GS25 Trần Nhật Duật, Q.1', addr: '32 Trần Nhật Duật, Phường Tân Định, Quận 1, TP. Hồ Chí Minh', stock: 'Còn 25 cái' },
          { name: 'GS25 Landmark 81, Bình Thạnh', addr: 'Tầng B1, Vinhomes Central Park, Quận Bình Thạnh, TP. Hồ Chí Minh', stock: 'Còn 30 cái' },
          { name: 'GS25 Thảo Điền, TP. Thủ Đức', addr: '12 Quốc Hương, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh', stock: 'Còn 35 cái' }
        ]
      }
    ],
    north: [
      {
        id: 'sg_north_1',
        title: 'Hộp Quà Happy Fridge: Sắc Thu Hà Nội',
        desc: 'Hộp quà phiên bản giới hạn Miền Bắc độc quyền GS25',
        bgClass: 'gift-box-bg',
        icon: 'fa-solid fa-box-archive',
        stock: 'Còn 650 cái',
        stores: [
          { name: 'GS25 36 Tràng Tiền, Hoàn Kiếm', addr: '36 Tràng Tiền, Quận Hoàn Kiếm, TP. Hà Nội', stock: 'Còn 120 cái' },
          { name: 'GS25 Vincom Bà Triệu, Hai Bà Trưng', addr: '191 Bà Triệu, Phường Lê Đại Hành, Quận Hai Bà Trưng, TP. Hà Nội', stock: 'Còn 90 cái' },
          { name: 'GS25 Cầu Giấy, Hà Nội', addr: '165 Cầu Giấy, Phường Dịch Vọng, Quận Cầu Giấy, TP. Hà Nội', stock: 'Còn 85 cái' },
          { name: 'GS25 Tây Hồ, Hà Nội', addr: '52 Tô Ngọc Vân, Phường Quảng An, Quận Tây Hồ, TP. Hà Nội', stock: 'Còn 110 cái' },
          { name: 'GS25 Royal City, Thanh Xuân', addr: 'Tầng B2, 72A Nguyễn Trãi, Quận Thanh Xuân, TP. Hà Nội', stock: 'Còn 70 cái' },
          { name: 'GS25 Time City, Hai Bà Trưng', addr: '458 Minh Khai, Phường Vĩnh Tuy, Quận Hai Bà Trưng, TP. Hà Nội', stock: 'Còn 95 cái' },
          { name: 'GS25 Mỹ Đình, Nam Từ Liêm', addr: '2 Lê Đức Thọ, Phường Mỹ Đình 2, Quận Nam Từ Liêm, TP. Hà Nội', stock: 'Còn 80 cái' }
        ]
      },
      {
        id: 'sg_north_2',
        title: 'Móc Khóa Yêu Nước GS25 Special Edition',
        desc: 'Móc khóa kim loại cao cấp phong cách Hà Nội',
        bgClass: 'tote-bg',
        icon: 'fa-solid fa-key',
        stock: 'Còn 400 cái',
        stores: [
          { name: 'GS25 36 Tràng Tiền, Hoàn Kiếm', addr: '36 Tràng Tiền, Quận Hoàn Kiếm, TP. Hà Nội', stock: 'Còn 80 cái' },
          { name: 'GS25 Vincom Bà Triệu, Hai Bà Trưng', addr: '191 Bà Triệu, Quận Hai Bà Trưng, TP. Hà Nội', stock: 'Còn 60 cái' },
          { name: 'GS25 Tây Hồ, Hà Nội', addr: '52 Tô Ngọc Vân, Quận Tây Hồ, TP. Hà Nội', stock: 'Còn 75 cái' },
          { name: 'GS25 Cầu Giấy, Hà Nội', addr: '165 Cầu Giấy, Quận Cầu Giấy, TP. Hà Nội', stock: 'Còn 50 cái' }
        ]
      },
      {
        id: 'sg_north_3',
        title: 'Bình Giữ Lạnh Youus Polar Bear',
        desc: 'Bình giữ nhiệt Youus in hình chú gấu Bắc Cực xinh xắn',
        bgClass: 'tumbler-bg',
        icon: 'fa-solid fa-bottle-water',
        stock: 'Còn 250 cái',
        stores: [
          { name: 'GS25 36 Tràng Tiền, Hoàn Kiếm', addr: '36 Tràng Tiền, Quận Hoàn Kiếm, TP. Hà Nội', stock: 'Còn 50 cái' },
          { name: 'GS25 Tây Hồ, Hà Nội', addr: '52 Tô Ngọc Vân, Quận Tây Hồ, TP. Hà Nội', stock: 'Còn 45 cái' },
          { name: 'GS25 Vincom Bà Triệu, Hai Bà Trưng', addr: '191 Bà Triệu, Quận Hai Bà Trưng, TP. Hà Nội', stock: 'Còn 35 cái' }
        ]
      }
    ]
  };

  // --- INITIALIZATION ---
  function init() {
    setupNavigation();
    setupDealsAndNews();
    renderStampGrid();
    renderStoreList('south');
    renderTxnLogs();
    renderMyGifts();
    setupEventListeners();
    navigateToPage('home-screen');
  }

  // --- NAVIGATION & PAGE SWITCHING ---
  function setupNavigation() {
    topSwitchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        navigateToPage(target);
      });
    });

    bottomNavTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const navTarget = tab.dataset.nav;
        navigateToPage(navTarget);
      });
    });

    if (quickDealsBtn) quickDealsBtn.addEventListener('click', () => openRewardOrDealDetail('Kem Merino - Mua 2 tặng 1 cùng loại', null, 'Hạn đổi 30/6/25'));
    if (quickRewardsBtn) quickRewardsBtn.addEventListener('click', () => openRewardOrDealDetail('Tặng 2 chai TH True Tea', 400, 'Hạn đổi 30/6/25'));
    if (quickCardsBtn) quickCardsBtn.addEventListener('click', () => navigateToPage('egift-card'));
    if (seeAllDealsBtn) seeAllDealsBtn.addEventListener('click', () => showToast('Đang hiển thị toàn bộ Ưu đãi GS25'));
    if (seeAllRewardsBtn) seeAllRewardsBtn.addEventListener('click', () => showToast('Đang hiển thị toàn bộ Đổi điểm quà tặng'));
    if (openStampGameCard) openStampGameCard.addEventListener('click', () => navigateToPage('stamp-game'));

    if (backToHomeFromStamp) backToHomeFromStamp.addEventListener('click', () => navigateToPage('home-screen'));
    if (backToHomeFromCard) backToHomeFromCard.addEventListener('click', () => navigateToPage('home-screen'));
    if (backToHomeFromFridge) backToHomeFromFridge.addEventListener('click', () => navigateToPage('home-screen'));

    if (homeOpenQrBtn) homeOpenQrBtn.addEventListener('click', () => {
      openModal(payModal);
      startQrCountdown();
    });

    if (storageSeeAllBtn) storageSeeAllBtn.addEventListener('click', () => navigateToPage('tu-lanh'));
    if (storageUseBtn) storageUseBtn.addEventListener('click', () => {
      openModal(payModal);
      startQrCountdown();
    });

    if (viewPointsDetailBtn) viewPointsDetailBtn.addEventListener('click', () => showToast('Chi tiết điểm tích lũy: 9.500 điểm'));
  }

  function navigateToPage(pageId) {
    state.activePage = pageId;

    topSwitchBtns.forEach(b => {
      if (b.dataset.target === pageId) b.classList.add('active');
      else b.classList.remove('active');
    });

    bottomNavTabs.forEach(t => {
      if (t.dataset.nav === pageId) t.classList.add('active');
      else t.classList.remove('active');
    });

    appPages.forEach(page => {
      if (page.id === pageId) {
        page.classList.add('active');
        page.scrollTop = 0;
      } else {
        page.classList.remove('active');
      }
    });

    if (pageId === 'egift-card' && egiftCardListView && egiftCardDetailView) {
      // Stay on current view
    }
  }

  // --- DEALS & NEWS TAB SWITCHING & FILTERS ---
  function setupDealsAndNews() {
    if (tabDealsBtn && tabNewsBtn) {
      tabDealsBtn.addEventListener('click', () => {
        tabDealsBtn.classList.add('active');
        tabNewsBtn.classList.remove('active');
        dealsGridPanel.classList.add('active');
        newsGridPanel.classList.remove('active');
      });

      tabNewsBtn.addEventListener('click', () => {
        tabNewsBtn.classList.add('active');
        tabDealsBtn.classList.remove('active');
        newsGridPanel.classList.add('active');
        dealsGridPanel.classList.remove('active');
      });
    }

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        showToast(`Lọc danh sách: ${pill.textContent}`);
      });
    });
  }

  // --- REWARD & DEAL DETAILS MODAL ---
  function openRewardOrDealDetail(title, pts, exp = 'Hạn đổi 30/6/25') {
    state.currentDetail = { title, pts, exp };

    if (detailHeroTitle) detailHeroTitle.textContent = title.length > 18 ? title.substring(0, 18) + '...' : title;
    if (detailExpDate) detailExpDate.textContent = exp;
    if (detailItemTitle) detailItemTitle.textContent = title;
    if (detailUserPts) detailUserPts.textContent = `${state.userPoints.toLocaleString('vi-VN')} điểm`;

    if (pts) {
      detailPointBadge.style.display = 'inline-flex';
      detailPointBadge.innerHTML = `<i class="fa-solid fa-sun icon-star-gold"></i> <strong>${pts}</strong> điểm`;
      confirmRedeemBtn.textContent = 'Đổi ngay';
    } else {
      detailPointBadge.style.display = 'none';
      confirmRedeemBtn.textContent = 'Sử dụng';
    }

    openModal(rewardDetailModal);
  }

  // --- TỦ LẠNH 25 SEGMENT TAB SWITCHING ---
  function switchTulanhSegment(segment) {
    state.tulanhTab = segment;
    if (segment === 'storage') {
      tabMyStorage.classList.add('active');
      tabMyGift.classList.remove('active');
      panelMyStorage.classList.add('active');
      panelMyGift.classList.remove('active');
    } else {
      tabMyGift.classList.add('active');
      tabMyStorage.classList.remove('active');
      panelMyGift.classList.add('active');
      panelMyStorage.classList.remove('active');
    }
  }

  // --- TƯƠNG TÁC THỎA 2 ĐIỀU KIỆN ĐỂ TÍCH TEM ---
  function toggleCondition(type) {
    if (type === 'bill') {
      state.condBill = !state.condBill;
      if (condBillCard) condBillCard.classList.toggle('active', state.condBill);
    } else if (type === 'sponsor') {
      state.condSponsor = !state.condSponsor;
      if (condSponsorCard) condSponsorCard.classList.toggle('active', state.condSponsor);
    }
    updateEarnStampButton();
  }

  function updateEarnStampButton() {
    const canEarn = state.condBill && state.condSponsor;
    if (btnEarnStamp) {
      btnEarnStamp.disabled = !canEarn;
      btnEarnStamp.classList.toggle('ready', canEarn);
    }
    if (earnStampHint) {
      if (canEarn) {
        earnStampHint.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #059669;"></i> Đã thỏa đủ 2 điều kiện! Bấm nút để tích 01 tem.';
        earnStampHint.style.color = '#059669';
      } else {
        earnStampHint.innerHTML = '<i class="fa-solid fa-circle-info"></i> Bấm chọn đủ 2 điều kiện trên để mở nút Tích 01 Tem';
        earnStampHint.style.color = '#64748b';
      }
    }
  }

  function earnStamp() {
    if (!state.condBill || !state.condSponsor) {
      showToast('Vui lòng chọn thỏa đủ 2 điều kiện để tích tem!');
      return;
    }
    state.userStamps++;
    renderStampGrid();
    showToast(`Đã tích thành công 01 Tem! (Tổng: ${state.userStamps} TEM)`);
  }

  // --- STAMP GAME MECHANICS & INTEGRATION WITH TỦ LẠNH MY GIFT ---
  function renderStampGrid() {
    // 1. Hiển thị Tổng số lượng TEM hiện đang có (chữ to rõ ràng)
    if (userTotalStampsDisplay) {
      userTotalStampsDisplay.textContent = state.userStamps;
    }

    // 2. Render 10 Slots trên Bảng Tích Tem Tổng Thể (Hành trình 10 Tem đổi Hộp Quà Happy Fridge)
    if (stampGrid) {
      stampGrid.innerHTML = '';
      for (let i = 1; i <= 10; i++) {
        const isEarned = i <= state.userStamps;
        const slot = document.createElement('div');
        
        let extraClasses = '';
        let iconHtml = '<i class="fa-solid fa-stamp stamp-icon"></i>';
        let badgeHtml = '';

        if (i === 10) {
          extraClasses = 'milestone-10-slot';
          iconHtml = '<i class="fa-solid fa-crown stamp-icon"></i>';
          badgeHtml = '<span class="slot-m-badge">Happy Fridge</span>';
        }

        slot.className = `stamp-slot ${extraClasses} ${isEarned ? 'active' : ''}`;
        slot.innerHTML = `
          <span class="slot-num">${i}</span>
          ${iconHtml}
          ${badgeHtml}
        `;
        stampGrid.appendChild(slot);
      }
    }

    // Badge nếu vượt mốc 10 tem
    if (boardOverfillBadge) {
      if (state.userStamps > 10) {
        boardOverfillBadge.style.display = 'inline-block';
        boardOverfillBadge.textContent = `🎉 Vượt mốc: +${state.userStamps - 10} TEM`;
      } else {
        boardOverfillBadge.style.display = 'none';
      }
    }

    // 3. Cập nhật thanh Progress Bar
    updateProgressBar();

    // 4. Cập nhật UI/UX hiển thị số lượng 10 TEM tích và trạng thái nút Đổi Quà Hộp Quà Happy Fridge
    renderMilestone10Tracker();
  }

  // --- CẬP NHẬT THANH PROGRESS BAR (Tiến trình tới 10 TEM & Vượt mốc >10 TEM) ---
  function updateProgressBar() {
    if (!stampProgressFill) return;

    if (progCurrentLabel) {
      progCurrentLabel.textContent = `${state.userStamps} TEM`;
    }

    let pct = 0;
    if (state.userStamps === 0) {
      pct = 0;
    } else if (state.userStamps <= 10) {
      pct = (state.userStamps / 10) * 82; // Đến node 10 tại 82%
    } else {
      // Khi vượt qua 10 TEM: thanh vẫn chạy dài tiếp tục!
      const overStamps = state.userStamps - 10;
      pct = Math.min(82 + overStamps * 9, 100);
    }

    stampProgressFill.style.width = `${pct}%`;

    if (progressNode10) {
      progressNode10.classList.toggle('active', state.userStamps >= 10);
    }

    if (progressNodeOverflow) {
      if (state.userStamps > 10) {
        progressNodeOverflow.style.display = 'flex';
        if (progressOverflowCount) progressOverflowCount.textContent = `+${state.userStamps - 10}`;
      } else {
        progressNodeOverflow.style.display = 'none';
      }
    }
  }

  // --- CẬP NHẬT UI/UX PHẦN 10 TEM & MINI TRACKER ---
  function renderMilestone10Tracker() {
    const current10 = Math.min(state.userStamps, 10);
    if (m10StampCountLabel) m10StampCountLabel.textContent = current10;

    // Render 10 mini slots tích tem
    if (m10MiniSlotsRow) {
      m10MiniSlotsRow.innerHTML = '';
      for (let i = 1; i <= 10; i++) {
        const isEarned = i <= state.userStamps;
        const slotEl = document.createElement('div');
        const isM10 = i === 10;
        slotEl.className = `mini-slot ${isM10 ? 'milestone-10' : ''} ${isEarned ? 'active' : ''}`;
        slotEl.innerHTML = isEarned
          ? `<span class="mini-slot-check"><i class="fa-solid fa-check"></i></span>`
          : `<span class="mini-slot-num">${i}</span>`;
        slotEl.title = `Tem ${i}/10: ${isEarned ? 'Đã tích' : 'Chưa tích'}`;
        m10MiniSlotsRow.appendChild(slotEl);
      }
    }

    // Status text & Enable / Disable button Đổi Quà mốc 10
    const canRedeem10 = state.userStamps >= 10;
    if (m10ProgressStatusText) {
      if (canRedeem10) {
        m10ProgressStatusText.textContent = `Đủ 10/10 Tem! (Sẵn sàng đổi Hộp Quà) 🎉`;
        m10ProgressStatusText.className = 'tracker-progress-text ready';
      } else {
        m10ProgressStatusText.textContent = `Đã tích: ${current10}/10 TEM (Thiếu ${10 - current10} tem)`;
        m10ProgressStatusText.className = 'tracker-progress-text';
      }
    }

    if (milestoneClaimBtn10) {
      milestoneClaimBtn10.disabled = !canRedeem10;
      milestoneClaimBtn10.className = `cm-redeem-btn btn-m10 ${canRedeem10 ? 'enabled' : 'disabled'}`;
      milestoneClaimBtn10.textContent = 'ĐỔI QUÀ';
    }
  }



  // --- RENDER DANH SÁCH CỬA HÀNG ĐỔI QUÀ (Store List.jpg & Store List - Expand.jpg) ---
  function renderStoreList(region = 'south') {
    state.currentStoreRegionTab = region;

    if (tabStoreSouth && tabStoreNorth) {
      if (region === 'south') {
        tabStoreSouth.classList.add('active');
        tabStoreNorth.classList.remove('active');
      } else {
        tabStoreNorth.classList.add('active');
        tabStoreSouth.classList.remove('active');
      }
    }

    if (!storeGiftCardsContainer) return;
    storeGiftCardsContainer.innerHTML = '';

    const list = storeListData[region] || storeListData.south;

    list.forEach((giftItem, itemIdx) => {
      const card = document.createElement('div');
      card.className = 'store-gift-card';

      // Card Header & Item Row
      const productRow = document.createElement('div');
      productRow.className = 'sg-product-row';
      productRow.innerHTML = `
        <div class="sg-img-box ${giftItem.bgClass}">
          <i class="${giftItem.icon}"></i>
        </div>
        <div class="sg-product-info">
          <span class="sg-stock-badge-pill">
            <i class="fa-solid fa-box"></i> ${giftItem.stock}
          </span>
          <h4 class="sg-product-title">${giftItem.title}</h4>
          <span class="sg-product-desc">${giftItem.desc}</span>
        </div>
      `;
      card.appendChild(productRow);

      // Accordion Trigger: "X cửa hàng có sản phẩm này" (Expand/Collapse as in Store List.jpg & Store List - Expand.jpg)
      const accordionToggle = document.createElement('div');
      // Default: Expand first item to match Store List - Expand.jpg
      const isExpanded = itemIdx === 0;
      accordionToggle.className = `sg-accordion-toggle ${isExpanded ? 'expanded' : ''}`;
      accordionToggle.innerHTML = `
        <span><i class="fa-solid fa-store" style="color: #0284c7; margin-right: 6px;"></i> ${giftItem.stores.length} cửa hàng có sản phẩm này</span>
        <i class="fa-solid fa-chevron-down toggle-icon"></i>
      `;
      card.appendChild(accordionToggle);

      // Stores Drawer Container
      const storesDrawer = document.createElement('div');
      storesDrawer.className = `sg-stores-drawer ${isExpanded ? 'open' : ''}`;

      giftItem.stores.forEach(st => {
        const storeItem = document.createElement('div');
        storeItem.className = 'sg-store-item';
        storeItem.innerHTML = `
          <div class="sg-store-name-col">
            <strong class="sg-store-name">${st.name}</strong>
            <span class="sg-store-addr-short">${st.addr}</span>
          </div>
          <div class="sg-store-action-col">
            <span class="sg-store-qty-pill">${st.stock}</span>
            <a class="sg-view-map-link" href="javascript:void(0)" title="Xem bản đồ">
              <i class="fa-solid fa-map-location-dot"></i> Xem bản đồ
            </a>
          </div>
        `;

        // Click "Xem bản đồ" -> Mở modal xem vị trí cửa hàng
        const mapLink = storeItem.querySelector('.sg-view-map-link');
        mapLink.addEventListener('click', (e) => {
          e.stopPropagation();
          openStoreMapModal(st.name, st.addr, st.stock);
        });

        storesDrawer.appendChild(storeItem);
      });

      card.appendChild(storesDrawer);

      // Click Accordion Toggle -> Expand / Collapse Drawer
      accordionToggle.addEventListener('click', () => {
        const currentlyOpen = storesDrawer.classList.contains('open');
        if (currentlyOpen) {
          storesDrawer.classList.remove('open');
          accordionToggle.classList.remove('expanded');
        } else {
          storesDrawer.classList.add('open');
          accordionToggle.classList.add('expanded');
        }
      });

      storeGiftCardsContainer.appendChild(card);
    });
  }

  // --- MỞ MODAL XEM BẢN ĐỒ CỬA HÀNG GS25 ---
  function openStoreMapModal(name, address, stock) {
    if (mapModalStoreName) mapModalStoreName.textContent = name;
    if (mapModalAddress) mapModalAddress.textContent = address;
    if (mapModalStock) mapModalStock.innerHTML = `<i class="fa-solid fa-box"></i> ${stock}`;
    openModal(storeMapModal);
  }

  // --- MỞ POP-UP XÁC NHẬN ĐỔI QUÀ (100% GS25 STYLE theo 3.0.2 Confirmation.jpg) ---
  function openRedeemConfirmation(milestone = 10, region = state.selectedRegion || 'Miền Nam') {
    if (state.userStamps < milestone) {
      showToast(`Chưa đủ ${milestone} tem để đổi quà (Hiện có: ${state.userStamps} tem)`);
      return;
    }

    state.selectedBagMilestone = milestone;

    if (confirmModalTitle) confirmModalTitle.textContent = 'Bạn có muốn đổi tem?';
    if (confirmModalSub) {
      confirmModalSub.innerHTML = `Bạn đang đổi <strong>10 TEM</strong> lấy <strong>Hộp Quà Happy Fridge Đặc Biệt</strong>`;
    }
    if (confirmStampVisualQty) confirmStampVisualQty.textContent = '10 TEM';
    if (confirmGiftVisualTag) confirmGiftVisualTag.textContent = 'HAPPY FRIDGE';
    if (confirmRewardName) confirmRewardName.textContent = `Hộp Quà Happy Fridge Đặc Biệt (${region})`;
    if (confirmDeductStamps) {
      confirmDeductStamps.textContent = `-10 TEM (Tổng còn lại: ${state.userStamps - 10} TEM)`;
    }

    openModal(redeemConfirmModal);
  }

  // --- MỞ POP-UP CHỌN KHU VỰC ĐỔI QUÀ (10 TEM -> HỘP QUÀ HAPPY FRIDGE) ---
  function openRegionSelectionModal(milestone = 10) {
    state.selectedBagMilestone = milestone;
    if (regionRewardNameDisplay) {
      regionRewardNameDisplay.textContent = 'Hộp Quà Happy Fridge Đặc Biệt';
    }
    updateStockSimUI();
    openModal(redeemRegionModal);
  }

  // --- XỬ LÝ CHỌN MIỀN TRONG POP-UP "BẠN MUỐN ĐỔI QUÀ Ở ĐÂU?" ---
  function handleRegionChoice(region) {
    const milestone = state.selectedBagMilestone || 10;
    state.selectedRegion = region;
    const regionKey = region === 'Miền Nam' ? 'south' : 'north';
    const currentStock = (state.rewardStock[milestone] && state.rewardStock[milestone][regionKey]) ?? 0;

    closeModal(redeemRegionModal);

    if (currentStock <= 0) {
      // TRƯỜNG HỢP 2: HẾT STOCK QUÀ "HAPPY FRIDGE" -> Mở pop-up thông báo hết stock theo miền
      openOutOfStockModal(region);
    } else {
      // TRƯỜNG HỢP 1: CÒN STOCK QUÀ "HAPPY FRIDGE" -> Mở pop-up "Bạn có muốn đổi tem?"
      openRedeemConfirmation(milestone, region);
    }
  }

  // --- MỞ POP-UP THÔNG BÁO HẾT STOCK QUÀ (MIỀN NAM / MIỀN BẮC) ---
  function openOutOfStockModal(region) {
    if (outOfStockTitle) {
      outOfStockTitle.textContent = `HẾT STOCK QUÀ ${region.toUpperCase()}!`;
    }
    if (outOfStockRegionName) {
      outOfStockRegionName.textContent = region;
    }
    if (outOfStockDesc) {
      outOfStockDesc.innerHTML = `Rất tiếc, phần thưởng <strong>Hộp Quà Happy Fridge</strong> tại khu vực <strong>${region}</strong> hiện đã hết stock.`;
    }
    openModal(outOfStockModal);
  }

  // --- CẬP NHẬT TRẠNG THÁI ACTIVE TRÊN THANH TEST KHO QUÀ (SIMULATOR) ---
  function updateStockSimUI() {
    const stockObj = state.rewardStock[10] || { south: 5, north: 3 };
    const sStock = stockObj.south;
    const nStock = stockObj.north;

    if (simStockBoth) simStockBoth.classList.toggle('active', sStock > 0 && nStock > 0);
    if (simStockNoSouth) simStockNoSouth.classList.toggle('active', sStock <= 0 && nStock > 0);
    if (simStockNoNorth) simStockNoNorth.classList.toggle('active', sStock > 0 && nStock <= 0);
    if (simStockNone) simStockNone.classList.toggle('active', sStock <= 0 && nStock <= 0);
  }

  // --- THỰC HIỆN ĐỔI QUÀ KHI CLICK "XÁC NHẬN ĐỔI" ---
  function executeConfirmedRedemption() {
    const milestone = 10;
    if (state.userStamps < milestone) {
      showToast(`Số lượng tem không đủ để đổi quà (Cần ${milestone} tem, hiện có ${state.userStamps} tem)`);
      closeModal(redeemConfirmModal);
      return;
    }

    closeModal(redeemConfirmModal);

    const region = state.selectedRegion || 'Miền Nam';
    const regKey = region === 'Miền Nam' ? 'south' : 'north';

    // Kiểm tra stock an toàn
    if (state.rewardStock[10][regKey] <= 0) {
      openOutOfStockModal(region);
      return;
    }

    // 1. Trừ stock của miền được chọn
    state.rewardStock[10][regKey]--;
    updateStockSimUI();

    // 2. Trừ 10 TEM
    state.userStamps -= 10;

    // 3. Issue vào Tủ Lạnh (My Gift)
    const regCode = region === 'Miền Nam' ? 'MN' : 'MB';
    const voucherCode = `GS25-${regCode}-FRIDGE-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newGift = {
      id: Date.now(),
      title: `Hộp Quà Happy Fridge Đặc Biệt (${region})`,
      exp: 'Hạn dùng 30 ngày',
      bgClass: 'blindbox-6-bg',
      tag: `${region.toUpperCase()} • HAPPY FRIDGE 👑`,
      subTitle: `Hộp quà đặc biệt mở tại quầy khi đổi (GS25 ${region})`,
      code: voucherCode,
      region: region,
      isNew: true
    };
    state.myGifts.unshift(newGift);

    // 4. Cấu hình Pop-up "ĐỔI QUÀ THÀNH CÔNG!" gọn gàng theo yêu cầu:
    // Chỉ hiển thị đổi quà thành công, là quà "HAPPY FRIDGE" và nằm trong Tủ Lạnh, bỏ hết dư thừa, 1 nút "Trở Lại Trang"
    if (successBagSourceTag) successBagSourceTag.textContent = `MỐC 10 TEM • HAPPY FRIDGE`;
    if (successItemTitle) successItemTitle.textContent = `Hộp Quà Happy Fridge Đặc Biệt (${region})`;
    if (successItemValue) successItemValue.textContent = `Hộp quà đặc biệt mở tại quầy khi đổi`;
    if (successDestinationNotice) {
      successDestinationNotice.innerHTML = `Phần quà <strong>HAPPY FRIDGE</strong> đã sẵn sàng trong <strong>Tủ Lạnh (My Gift)</strong> để bạn sử dụng bất cứ lúc nào tại quầy GS25.`;
    }
    if (successItemIcon) {
      successItemIcon.innerHTML = `<i class="fa-solid fa-box-archive"></i>`;
      successItemIcon.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)';
    }

    openModal(redeemSuccessModal);
    renderStampGrid();
    renderMyGifts();
    showToast(`Đổi thành công Hộp Quà Happy Fridge (${region})! Quà đã có trong Tủ Lạnh.`);
  }

  // --- RENDER MY GIFTS IN TỦ LẠNH 25 ---
  function renderMyGifts() {
    if (!myGiftsListContainer) return;
    myGiftsListContainer.innerHTML = '';

    const giftCount = state.myGifts.length;
    if (myGiftBadge) myGiftBadge.textContent = giftCount;
    if (fridgeBadgeCount) fridgeBadgeCount.textContent = giftCount + 3; // Total storage + gifts

    state.myGifts.forEach(gift => {
      const card = document.createElement('div');
      card.className = 'my-gift-card-v';

      card.innerHTML = `
        <div class="gift-img-box ${gift.bgClass}">
          <span class="poster-tag">${gift.tag}</span>
          <span class="poster-sub-title">${gift.subTitle}</span>
        </div>
        <div class="gift-content">
          <div class="gift-exp-pill">
            <i class="fa-regular fa-clock"></i> ${gift.exp}
            ${gift.region ? `<span class="gift-region-badge"><i class="fa-solid fa-location-dot"></i> ${gift.region}</span>` : ''}
          </div>
          <h4 class="gift-item-title">${gift.title}</h4>
          <button class="gift-claim-action-btn" data-title="${gift.title}">Lấy ngay</button>
        </div>
      `;

      const claimBtn = card.querySelector('.gift-claim-action-btn');
      claimBtn.addEventListener('click', () => {
        if (modalCardTitle) modalCardTitle.textContent = gift.title;
        openModal(payModal);
        startQrCountdown();
        showToast(`Đã chọn quà: "${gift.title}". Đưa QR cho Thu ngân tại quầy!`);
      });

      myGiftsListContainer.appendChild(card);
    });
  }

  // --- E-GIFT CARD DETAILED FLOW & MECHANICS ---
  function selectCard(cardElement) {
    realCards.forEach(c => c.classList.remove('active'));
    cardElement.classList.add('active');

    state.selectedCardId = cardElement.dataset.cardid;
    state.selectedCardName = cardElement.dataset.name || 'GS25 Standard';
    const cardVal = parseInt(cardElement.dataset.val);

    if (cardElement.classList.contains('green-card')) state.cardHeroClass = 'green-hero';
    else if (cardElement.classList.contains('pink-card')) state.cardHeroClass = 'pink-hero';
    else if (cardElement.classList.contains('premium-gold-card')) state.cardHeroClass = 'gold-hero';
    else state.cardHeroClass = 'black-hero';

    state.cardBalance = cardVal === 500000 ? 520000 : cardVal;

    updateCardDetailViewDOM(cardVal);
    openCardDetailView();
  }

  function updateCardDetailViewDOM(initialVal = 200000) {
    if (detailCardGraphic) {
      detailCardGraphic.className = `detail-card-hero ${state.cardHeroClass}`;
    }
    if (detailCardCode) {
      detailCardCode.textContent = `*****${state.selectedCardId.substring(2)}`;
    }
    if (detailInitialVal) {
      detailInitialVal.textContent = `${initialVal.toLocaleString('vi-VN')}đ`;
    }
    if (detailCardRemaining) {
      detailCardRemaining.textContent = `${state.cardBalance.toLocaleString('vi-VN')}đ`;
    }
    if (modalCardBalance) {
      modalCardBalance.textContent = `${state.cardBalance.toLocaleString('vi-VN')}đ`;
    }
  }

  function openCardDetailView() {
    if (egiftCardListView && egiftCardDetailView) {
      egiftCardListView.style.display = 'none';
      egiftCardDetailView.style.display = 'block';
      egiftCardDetailView.scrollTop = 0;
    }
  }

  function closeCardDetailView() {
    if (egiftCardListView && egiftCardDetailView) {
      egiftCardDetailView.style.display = 'none';
      egiftCardListView.style.display = 'block';
    }
  }

  function topupCardPos(amount, bonusPercent = 0) {
    const bonus = amount * bonusPercent;
    const totalAdded = amount + bonus;
    state.cardBalance += totalAdded;

    if (modalCardBalance) modalCardBalance.textContent = `${state.cardBalance.toLocaleString('vi-VN')}đ`;
    if (detailCardRemaining) detailCardRemaining.textContent = `${state.cardBalance.toLocaleString('vi-VN')}đ`;

    const now = new Date();
    const dateStr = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

    state.txnLogs.unshift({
      type: 'credit',
      title: `Nạp tiền tại POS GS25 +${amount.toLocaleString('vi-VN')}đ ${bonus > 0 ? '(+' + bonus.toLocaleString('vi-VN') + 'đ Bonus)' : ''}`,
      date: dateStr,
      amount: totalAdded
    });

    renderTxnLogs();
    showToast(`Thu ngân POS đã nạp thành công ${totalAdded.toLocaleString('vi-VN')}đ vào Thẻ E-Gift!`);
  }

  function renderTxnLogs() {
    if (!txnList) return;
    txnList.innerHTML = '';
    state.txnLogs.forEach(log => {
      const li = document.createElement('li');
      li.className = `txn-item ${log.type}`;

      const iconClass = log.type === 'credit' ? 'fa-plus' : 'fa-minus';
      const amountPrefix = log.type === 'credit' ? '+' : '';

      li.innerHTML = `
        <div class="t-icon"><i class="fa-solid ${iconClass}"></i></div>
        <div class="t-details">
          <strong>${log.title}</strong>
          <small>${log.date}</small>
        </div>
        <div class="t-amount ${log.type}">${amountPrefix}${log.amount.toLocaleString('vi-VN')}đ</div>
      `;
      txnList.appendChild(li);
    });

    // Also update detailTxnList in Card Detail View
    if (detailTxnList && state.txnLogs.length > 0) {
      const firstLog = state.txnLogs[0];
      detailTxnList.innerHTML = `
        <div class="detail-txn-card">
          <div class="txn-card-header">
            <strong>${firstLog.title}</strong>
            <span class="txn-amount ${firstLog.type}">${firstLog.type === 'credit' ? '+' : ''}${firstLog.amount.toLocaleString('vi-VN')}đ</span>
          </div>
          <div class="txn-meta-row">
            <span>${firstLog.date}</span>
            <span>GS25 106 Nguyen Gian Thanh</span>
          </div>
          <div class="txn-code-bar">
            <i class="fa-solid fa-receipt"></i>
            <span>e124bdj-23jjkfnk-kj2b31k-nmmvva12</span>
          </div>
          <button class="txn-detail-btn">Xem chi tiết</button>
        </div>
      `;
    }
  }

  // --- POS QR COUNTDOWN TIMER ---
  function startQrCountdown() {
    state.qrTimeLeft = 15;
    if (qrCountdown) qrCountdown.textContent = '00:15s';

    if (state.qrTimerInterval) clearInterval(state.qrTimerInterval);

    state.qrTimerInterval = setInterval(() => {
      state.qrTimeLeft--;
      if (state.qrTimeLeft <= 0) {
        clearInterval(state.qrTimerInterval);
        if (qrCountdown) qrCountdown.textContent = '00:00s (Hết hạn)';
      } else {
        const sec = state.qrTimeLeft.toString().padStart(2, '0');
        if (qrCountdown) qrCountdown.textContent = `00:${sec}s`;
      }
    }, 1000);
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Floating Widget
    if (closeFloatingWidgetBtn) {
      closeFloatingWidgetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floatingPromoWidget.style.display = 'none';
      });
    }

    if (openFloatingQrBtn) {
      openFloatingQrBtn.addEventListener('click', () => {
        navigateToPage('stamp-game');
      });
    }

    // Deal and Reward Cards click -> open Reward/Deal Details Modal
    document.querySelectorAll('.deal-card-gs, .reward-card-gs, .grid-card-gs').forEach(card => {
      card.addEventListener('click', () => {
        const title = card.dataset.deal || card.dataset.reward || card.dataset.title || 'Ưu đãi đặc biệt GS25';
        const pts = card.dataset.pts ? parseInt(card.dataset.pts) : null;
        openRewardOrDealDetail(title, pts);
      });
    });

    if (confirmRedeemBtn) {
      confirmRedeemBtn.addEventListener('click', () => {
        closeModal(rewardDetailModal);
        openModal(payModal);
        startQrCountdown();
        showToast(`Đã chọn "${state.currentDetail ? state.currentDetail.title : 'Ưu đãi'}". Hãy đưa QR cho Thu ngân!`);
      });
    }

    // Tủ Lạnh 25 Tab Switching
    if (tabMyStorage) tabMyStorage.addEventListener('click', () => switchTulanhSegment('storage'));
    if (tabMyGift) tabMyGift.addEventListener('click', () => switchTulanhSegment('gift'));

    tulanhUseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.dataset.item;
        if (modalCardTitle) modalCardTitle.textContent = `VOUCHER: ${item}`;
        openModal(payModal);
        startQrCountdown();
        showToast(`Đưa mã QR cho Thu ngân để nhận món "${item}"!`);
      });
    });

    // Stamp Game Claim Action (10 TEM -> Hộp Quà Happy Fridge)
    // Flow: Hiển thị pop-up "Bạn muốn đổi quà ở đâu?" trước -> Sau đó kiểm tra stock Miền Nam / Miền Bắc
    if (milestoneClaimBtn10) {
      milestoneClaimBtn10.addEventListener('click', () => {
        if (state.userStamps < 10) {
          showToast(`Chưa đủ 10 tem để đổi quà (Hiện có: ${state.userStamps} tem)`);
          return;
        }
        state.selectedBagMilestone = 10;
        openRegionSelectionModal(10);
      });
    }

    // Navigation: Mở trang Danh Sách Cửa Hàng Đổi Hộp Quà Happy Fridge (Store List.jpg & Store List - Expand.jpg)
    if (openStoreListBtn) {
      openStoreListBtn.addEventListener('click', () => {
        renderStoreList(state.currentStoreRegionTab || 'south');
        navigateToPage('store-list-page');
      });
    }

    if (backToStampFromStoreList) {
      backToStampFromStoreList.addEventListener('click', () => {
        navigateToPage('stamp-game');
      });
    }

    if (tabStoreSouth) {
      tabStoreSouth.addEventListener('click', () => {
        renderStoreList('south');
      });
    }

    if (tabStoreNorth) {
      tabStoreNorth.addEventListener('click', () => {
        renderStoreList('north');
      });
    }

    if (storeListHelpBtn) {
      storeListHelpBtn.addEventListener('click', () => {
        showToast('Chọn Miền Nam hoặc Miền Bắc để kiểm tra số lượng quà còn tại từng cửa hàng!');
      });
    }

    // Modal Bản Đồ Cửa Hàng Actions
    if (btnOpenGoogleMaps) {
      btnOpenGoogleMaps.addEventListener('click', () => {
        const storeName = mapModalStoreName ? mapModalStoreName.textContent : 'GS25';
        showToast(`Đang mở Google Maps chỉ đường tới "${storeName}"...`);
        setTimeout(() => {
          closeModal(storeMapModal);
        }, 1200);
      });
    }

    if (btnCloseStoreMapModal) {
      btnCloseStoreMapModal.addEventListener('click', () => {
        closeModal(storeMapModal);
      });
    }

    // Pop-up "Bạn có muốn đổi tem?" -> Bấm "Xác Nhận Đổi" -> Đổi quà thành công
    if (btnConfirmExchange) {
      btnConfirmExchange.addEventListener('click', () => {
        executeConfirmedRedemption();
      });
    }
    if (btnCancelExchange) {
      btnCancelExchange.addEventListener('click', () => closeModal(redeemConfirmModal));
    }

    // Pop-up "Bạn muốn đổi quà ở đâu?" -> Bấm chọn "Miền Nam" hoặc "Miền Bắc"
    if (btnRegionSouth) {
      btnRegionSouth.addEventListener('click', () => handleRegionChoice('Miền Nam'));
    }
    if (btnRegionNorth) {
      btnRegionNorth.addEventListener('click', () => handleRegionChoice('Miền Bắc'));
    }
    if (btnBackFromRegion) {
      btnBackFromRegion.addEventListener('click', () => closeModal(redeemRegionModal));
    }

    // Pop-up Thông Báo Hết Stock (Case 2) Actions
    if (btnChooseOtherRegion) {
      btnChooseOtherRegion.addEventListener('click', () => {
        closeModal(outOfStockModal);
        openRegionSelectionModal(10);
      });
    }
    if (btnCloseOutOfStock) {
      btnCloseOutOfStock.addEventListener('click', () => closeModal(outOfStockModal));
    }

    // Simulator Stock Quick Test Controls (Mô phỏng kho quà 10 TEM Happy Fridge)
    if (simStockBoth) {
      simStockBoth.addEventListener('click', () => {
        state.rewardStock[10].south = 5;
        state.rewardStock[10].north = 3;
        updateStockSimUI();
        showToast('Mô phỏng: Cả 2 miền (Nam & Bắc) đều CÒN QUÀ HAPPY FRIDGE');
      });
    }
    if (simStockNoSouth) {
      simStockNoSouth.addEventListener('click', () => {
        state.rewardStock[10].south = 0;
        state.rewardStock[10].north = 3;
        updateStockSimUI();
        showToast('Mô phỏng: Miền Nam HẾT QUÀ HAPPY FRIDGE');
      });
    }
    if (simStockNoNorth) {
      simStockNoNorth.addEventListener('click', () => {
        state.rewardStock[10].south = 5;
        state.rewardStock[10].north = 0;
        updateStockSimUI();
        showToast('Mô phỏng: Miền Bắc HẾT QUÀ HAPPY FRIDGE');
      });
    }
    if (simStockNone) {
      simStockNone.addEventListener('click', () => {
        state.rewardStock[10].south = 0;
        state.rewardStock[10].north = 0;
        updateStockSimUI();
        showToast('Mô phỏng: CẢ 2 MIỀN ĐỀU HẾT QUÀ HAPPY FRIDGE');
      });
    }

    // Pop-up Đổi Quà Thành Công: 1 button duy nhất "Trở Lại Trang"
    if (stayStampGameBtn) {
      stayStampGameBtn.addEventListener('click', () => closeModal(redeemSuccessModal));
    }

    // Interactive Conditions Toggle & Earn Stamp
    if (condBillCard) condBillCard.addEventListener('click', () => toggleCondition('bill'));
    if (condSponsorCard) condSponsorCard.addEventListener('click', () => toggleCondition('sponsor'));
    if (btnEarnStamp) btnEarnStamp.addEventListener('click', () => earnStamp());

    // Demo Helpers for Quick Testing
    if (simResetStampsBtn) {
      simResetStampsBtn.addEventListener('click', () => {
        state.userStamps = 0;
        state.condBill = false;
        state.condSponsor = false;
        if (condBillCard) condBillCard.classList.remove('active');
        if (condSponsorCard) condSponsorCard.classList.remove('active');
        updateEarnStampButton();
        renderStampGrid();
        showToast('Đã đặt lại Game Tem về 0 Tem!');
      });
    }

    if (simQuickAdd1Btn) {
      simQuickAdd1Btn.addEventListener('click', () => {
        state.userStamps += 1;
        renderStampGrid();
        showToast(`Đã thêm +1 Tem! (Tổng: ${state.userStamps} TEM)`);
      });
    }

    if (simQuickAdd5Btn) {
      simQuickAdd5Btn.addEventListener('click', () => {
        state.userStamps += 5;
        renderStampGrid();
        showToast(`Đã thêm +5 Tem! (Tổng: ${state.userStamps} TEM)`);
      });
    }

    if (simQuickAdd10Btn) {
      simQuickAdd10Btn.addEventListener('click', () => {
        state.userStamps += 10;
        renderStampGrid();
        showToast(`Đã thêm +10 Tem! (Tổng: ${state.userStamps} TEM)`);
      });
    }

    if (simQuickAdd12Btn) {
      simQuickAdd12Btn.addEventListener('click', () => {
        state.userStamps = 12;
        renderStampGrid();
        showToast(`Đã đặt 12 Tem! (Vượt mốc 10 Tem: thanh tiến trình tiếp tục chạy dài)`);
      });
    }

    // E-Gift Card Actions & Navigation
    realCards.forEach(card => card.addEventListener('click', () => selectCard(card)));

    if (openCardDetailDirectBtn) {
      openCardDetailDirectBtn.addEventListener('click', () => {
        updateCardDetailViewDOM(200000);
        openCardDetailView();
      });
    }

    if (backToCardCatalogBtn) {
      backToCardCatalogBtn.addEventListener('click', () => closeCardDetailView());
    }

    if (scrollToTncBtn && tncDetailsBox) {
      scrollToTncBtn.addEventListener('click', () => {
        tncDetailsBox.scrollIntoView({ behavior: 'smooth' });
      });
    }

    if (cardTncCheck && payFromDetailBtn) {
      cardTncCheck.addEventListener('change', () => {
        payFromDetailBtn.disabled = !cardTncCheck.checked;
        payFromDetailBtn.style.opacity = cardTncCheck.checked ? '1' : '0.5';
      });
    }

    if (payFromDetailBtn) {
      payFromDetailBtn.addEventListener('click', () => {
        if (modalCardTitle) modalCardTitle.textContent = `THẺ E-GIFT: ${state.selectedCardName}`;
        openModal(payModal);
        startQrCountdown();
      });
    }

    if (openPayModalBtn) openPayModalBtn.addEventListener('click', () => { openModal(payModal); startQrCountdown(); });
    if (closePayModalBtn) closePayModalBtn.addEventListener('click', () => closeModal(payModal));
    if (closePayModalBtn2) closePayModalBtn2.addEventListener('click', () => closeModal(payModal));

    if (showPosQrBtn) showPosQrBtn.addEventListener('click', () => { openModal(payModal); startQrCountdown(); });

    if (posTopup100Btn) posTopup100Btn.addEventListener('click', () => topupCardPos(100000));
    if (posTopup200Btn) posTopup200Btn.addEventListener('click', () => topupCardPos(200000));
    if (posTopup300Btn) posTopup300Btn.addEventListener('click', () => topupCardPos(300000));
    if (posTopup500Btn) posTopup500Btn.addEventListener('click', () => topupCardPos(500000, 0.04));

    if (openFridgeInfoModalBtn) openFridgeInfoModalBtn.addEventListener('click', () => openModal(fridgeInfoModal));
    if (closeFridgeInfoModalBtn) closeFridgeInfoModalBtn.addEventListener('click', () => closeModal(fridgeInfoModal));
    if (closeFridgeInfoModalBtn2) closeFridgeInfoModalBtn2.addEventListener('click', () => closeModal(fridgeInfoModal));

    if (openTxnHistoryBtn) openTxnHistoryBtn.addEventListener('click', () => openModal(txnModal));
    if (closeTxnModalBtn) closeTxnModalBtn.addEventListener('click', () => closeModal(txnModal));

    if (closeRewardDetailModalBtn) closeRewardDetailModalBtn.addEventListener('click', () => closeModal(rewardDetailModal));

    if (refreshQrBtn) refreshQrBtn.addEventListener('click', () => {
      startQrCountdown();
      showToast('Đã làm mới mã QR thanh toán!');
    });
  }

  // --- MODAL & TOAST HELPERS ---
  function openModal(modalEl) {
    if (modalEl) modalEl.classList.add('active');
  }

  function closeModal(modalEl) {
    if (modalEl) modalEl.classList.remove('active');
  }

  function showToast(msg) {
    if (!toastNoti || !toastMsg) return;
    toastMsg.textContent = msg;
    toastNoti.classList.add('show');
    setTimeout(() => {
      toastNoti.classList.remove('show');
    }, 3000);
  }

  // --- APPLICATION LAUNCH ---
  try {
    init();
  } catch (err) {
    console.error('Fatal initialization error:', err);
  }

});

