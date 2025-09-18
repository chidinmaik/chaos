// Audio elements
const thunderAudio = document.getElementById('thunder');
const sorcererAudio = document.getElementById('sorcerer-bg');
const muteBtn = document.getElementById('mute-toggle');
let isMuted = false;

// Start sorcerer audio
sorcererAudio.play().catch(err => console.error('Audio play error:', err));

// Modal navigation
function showSlide(slideNum) {
  sorcererAudio.pause();
  document.querySelectorAll('.slide').forEach(slide => slide.style.display = 'none');
  document.getElementById(`slide-${slideNum}`).style.display = 'block';
  if (!isMuted) sorcererAudio.play().catch(err => console.error('Audio play error:', err));
}

function closeModal() {
  sorcererAudio.pause();
  sorcererAudio.currentTime = 0;
  document.getElementById('intro-modal').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
  if (!isMuted) thunderAudio.play().catch(err => console.error('Audio play error:', err));
}

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  thunderAudio.muted = isMuted;
  sorcererAudio.muted = isMuted;
  muteBtn.textContent = isMuted ? '🔊 Unmute' : '🔇 Mute';
});

// Form handling
document.getElementById('summon-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const loader = document.getElementById('loader');
  loader.classList.add('active'); // Show loader
  document.getElementById('output').innerHTML = '';
  
  setTimeout(() => {
    loader.classList.remove('active'); // Hide loader
    
    // Get inputs
    const name = document.getElementById('name').value || 'Creator';
    const element = document.getElementById('element').value;
    const manifesto = document.getElementById('manifesto').value || 'A Creator';
    
    // AI logic
    const images = [
      'assets/fire-coin.png',
      'assets/chaos-coin.png',
      'assets/solana-coin.png',
      'assets/volt-coin.png'
    ];
    const messages = [
      `${name} summons a fiery $CREATOR sorcerer! ⚡️🔥`,
      `${name} unleashes a chaotic $CREATOR sorcerer! 🌪️`,
      `${name} channels a radiant $CREATOR sorcerer! ☀️`,
      `${name} sparks a voltaic $CREATOR sorcerer! ⚡️`
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];
    const selectedMessage = messages[randomIndex];
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    
    // Load image
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 300, 300);
      ctx.font = '70px Astloch';
      ctx.fillStyle = '#00f7ff';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#ff00ff';
      ctx.shadowBlur = 10;
      ctx.fillText(`${name}`, 150, 280);
      document.getElementById('output').innerHTML = `
        <img src="${canvas.toDataURL('image/png')}" alt="Summoned Sorcerer">
        <p>${selectedMessage}</p>
        <a href="${canvas.toDataURL('image/png')}" download="creator-${name}.png" class="download-btn">Download Image</a>
      `;
      console.log('Output rendered:', document.getElementById('output').innerHTML);
      console.log('Output height:', document.getElementById('output').offsetHeight);
    };
    img.onerror = () => {
      console.error('Image load error:', selectedImage);
      document.getElementById('output').innerHTML = `<p style="color: red;">Error: Could not load image. Check assets.</p>`;
    };
    
    // Tweet button
    const tweetText = encodeURIComponent(`I summoned ${element} for $CREATOR! ${selectedMessage} 🔥 # @CreatorDev_Sol`);
    document.getElementById('tweet').href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${window.location.href}`;
  }, 2000);
});