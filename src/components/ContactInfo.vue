<template>
  <section class="contact-container animate-fade-in-up delay-300">
    <h3 class="contact-title">LIÊN HỆ:</h3>
    <div class="contact-list">
      <a href="tel:0773997188" class="contact-btn">
        <span class="name">Chị Như (sđt)</span>
        <span class="detail">0773997188</span>
      </a>
      <a href="#" class="contact-btn">
        <span class="name">Nguyễn Ngọc Thùy Linh (mess)</span>
      </a>
    </div>
  </section>
</template>

<style scoped>
.contact-container {
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.contact-title {
  font-weight: 800;
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  text-shadow: var(--shadow-text);
  margin-right: 10px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  align-items: flex-end;
}

.contact-btn {
  background: #4a0000;
  color: #fff;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 350px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background: #6d0609;
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(0,0,0,0.4);
}

.name {
  font-weight: 500;
}

.detail {
  font-weight: 700;
  color: var(--color-accent);
}
</style>
