<template>
  <section class="event-section">

    <!-- ── Date block ── -->
    <div class="date-block animate-fade-in-down">
      <!-- THỜI GIAN watermark -->
      <div class="time-watermark-wrap animate-blur-in">
        <h2 class="time-watermark text-serif">THỜI GIAN</h2>
      </div>
      <p class="date-number text-serif animate-scale-in delay-100">09.08.2026</p>
      <p class="date-at text-script animate-fade-in-up delay-200">lúc 10:30am - 12:00pm</p>
    </div>

    <!-- ── Add to Calendar ── -->
    <div class="calendar-block animate-scale-in delay-200"> 
      <!-- Mini calendar tháng 8/2026 -->
      <a
        href="https://calendar.google.com/calendar/r/eventedit?text=Lễ+tốt+nghiệp+Thùy+Linh&dates=20260809T043000Z/20260809T050000Z&details=Lễ+tốt+nghiệp+Đại+học+Văn+Lang&location=69/68+Đặng+Thuỳ+Trâm,+An+Nhơn,+Hồ+Chí+Minh"
        target="_blank"
        rel="noopener noreferrer"
        class="mini-cal"
        aria-label="Thêm vào Google Calendar"
      >
        <!-- Header tháng -->
        <div class="cal-header">
          <span class="cal-month text-serif">Tháng 8 · 2026</span>
        </div>

        <!-- Tên thứ -->
        <div class="cal-grid cal-weekdays">
          <span>CN</span>
          <span>T2</span>
          <span>T3</span>
          <span>T4</span>
          <span>T5</span>
          <span>T6</span>
          <span>T7</span>
        </div>

        <!--
          Tháng 8/2026: ngày 1 là thứ 7 (index 6)
          → 6 ô trống trước ngày 1
        -->
        <div class="cal-grid cal-days">
          <!-- 6 ô trống tuần đầu -->
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
          <!-- 1–8 -->
          <span class="cal-day">1</span>
          <span class="cal-day">2</span>
          <span class="cal-day">3</span>
          <span class="cal-day">4</span>
          <span class="cal-day">5</span>
          <span class="cal-day">6</span>
          <span class="cal-day">7</span>
          <span class="cal-day">8</span>
          <!-- Ngày 9 được khoanh -->
          <span class="cal-day cal-day--highlight">9</span>
          <!-- 10–31 -->
          <span class="cal-day">10</span>
          <span class="cal-day">11</span>
          <span class="cal-day">12</span>
          <span class="cal-day">13</span>
          <span class="cal-day">14</span>
          <span class="cal-day">15</span>
          <span class="cal-day">16</span>
          <span class="cal-day">17</span>
          <span class="cal-day">18</span>
          <span class="cal-day">19</span>
          <span class="cal-day">20</span>
          <span class="cal-day">21</span>
          <span class="cal-day">22</span>
          <span class="cal-day">23</span>
          <span class="cal-day">24</span>
          <span class="cal-day">25</span>
          <span class="cal-day">26</span>
          <span class="cal-day">27</span>
          <span class="cal-day">28</span>
          <span class="cal-day">29</span>
          <span class="cal-day">30</span>
          <span class="cal-day">31</span>
        </div>

        <p class="cal-cta text-serif">Nhấn để thêm vào lịch ↗</p>
      </a>
    </div>

    <!-- thin separator line -->
    <div class="sep animate-fade-in delay-200"></div>

    <!-- ── Venue block ── -->
    <div class="venue-block animate-fade-in-up delay-200">
      <div class="venue-watermark-wrap animate-blur-in delay-100">
        <h2 class="venue-watermark text-serif">ĐỊA ĐIỂM</h2>
      </div>

      <img src="/images/Logo_VLU_2022.png" alt="Đại học Văn Lang" class="venue-logo animate-scale-in delay-200" />
      <p class="venue-address text-serif animate-fade-in-up delay-300">
        69/68 Đ. Đặng Thuỳ Trâm, An Nhơn<br />
        Bình Thạnh, Hồ Chí Minh
      </p>

      <a
        href="https://www.google.com/maps/search/?api=1&query=69/68+Đ.+Đặng+Thuỳ+Trâm,+An+Nhơn,+Hồ+Chí+Minh+70000,+Việt+Nam"
        target="_blank"
        rel="noopener noreferrer"
        class="map-btn text-serif animate-fade-in-up delay-400"
      >
        Xem bản đồ
      </a>
    </div>

    <!-- ── Divider trước gallery ── -->
    <div class="section-divider animate-fade-in delay-300"></div>

  </section>
</template>

<style scoped>
/* ── Section wrapper ───────────────────────────────────────── */
.event-section {
  background: var(--c-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 1.5rem 0;
  gap: 0;
  position: relative;
}

/* ── Date ──────────────────────────────────────────────────── */
.date-block {
  text-align: center;
  margin-bottom: 0.5rem;
}

.time-watermark-wrap {
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.time-watermark {
  font-size: clamp(1.1rem, 5vw, 2.2rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  color: #a31c2e;
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
}
.date-number {
  font-size: clamp(3rem, 12vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--c-text);
  line-height: 1;
}
.date-at {
  font-size: 2rem;
  color: var(--c-text-mid);
  letter-spacing: 0.02em;
  line-height: 1.2;
  margin-top: 0.3rem;
}

/* ── Add to Calendar ───────────────────────────────────────── */
.calendar-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 2rem;
}
.cal-label {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  color: var(--c-text-light);
  text-transform: uppercase;
}

/* ── Mini calendar card ────────────────────────────────────── */
.mini-cal {
  display: block;
  text-decoration: none;
  width: 300px;
  background: #fff;
  border: 1px solid #f0d8d8;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(122, 0, 24, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.mini-cal:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(122, 0, 24, 0.18);
}

/* Header */
.cal-header {
  background: #7a0018;
  padding: 0.7rem 0;
  text-align: center;
}
.cal-month {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* Grid shared */
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

/* Weekday headers */
.cal-weekdays {
  background: #fdf0f0;
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid #f0d8d8;
}
.cal-weekdays span {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #b06060;
  text-transform: uppercase;
  font-family: var(--f-sans);
}

/* Days grid */
.cal-days {
  padding: 0.45rem 0.5rem 0.5rem;
  gap: 3px 0;
}
.cal-day {
  font-size: 0.85rem;
  font-family: var(--f-serif);
  color: var(--c-text-mid);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 50%;
  line-height: 1;
}

/* Day 9 highlight — red circle */
.cal-day--highlight {
  background: #7a0018;
  color: #fff !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(122, 0, 24, 0.45);
  /* Pulse animation để nổi bật */
  animation: pulse-ring 2s ease-in-out infinite;
}
@keyframes pulse-ring {
  0%, 100% { box-shadow: 0 0 0 0 rgba(122, 0, 24, 0.4); }
  50%       { box-shadow: 0 0 0 5px rgba(122, 0, 24, 0); }
}

/* CTA text dưới lịch */
.cal-cta {
  text-align: center;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: #b06060;
  padding: 0.4rem 0 0.55rem;
  border-top: 1px solid #f0d8d8;
}

/* ── Separator ─────────────────────────────────────────────── */
.sep {
  width: 56px;
  height: 1px;
  background: var(--c-silver-light);
  margin-bottom: 2.2rem;
}

/* ── Venue ─────────────────────────────────────────────────── */
.venue-block {
  text-align: center;
  width: calc(100% + 3rem);
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  margin-bottom: 0;
  position: relative;
  padding: 2.5rem 1.5rem;
  background: url('/images/background-hall.jpg') center/cover no-repeat;
  overflow: hidden;
}

/* Lớp phủ mờ */
.venue-block::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  z-index: 0;
}

/* Đảm bảo các element con nổi lên trên overlay */
.venue-block > * {
  position: relative;
  z-index: 1;
}

.venue-watermark-wrap {
  overflow: hidden;
  margin-bottom: -0.8rem;
}
.venue-watermark {
  font-size: clamp(1.1rem, 5vw, 2.2rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.85);
  text-transform: uppercase;
  line-height: 1;
  white-space: nowrap;
  margin-bottom: 2rem;
}

.venue-logo {
  max-width: 180px;
  height: auto;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}
.venue-address {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.9);
  text-transform: uppercase;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  position: relative;
  z-index: 1;
}

.map-btn {
  display: inline-block;
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 30px;
  padding: 0.55rem 2rem;
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 0.2s ease, color 0.2s ease;
  position: relative;
  z-index: 1;
}
.map-btn:hover {
  background: rgba(255,255,255,0.2);
  color: #fff;
  border-color: #fff;
}

/* ── Section divider ───────────────────────────────────────── */
.section-divider {
  width: 40px;
  height: 1px;
  background: var(--c-silver-light);
  margin: 0 auto 2.5rem;
}

</style>
