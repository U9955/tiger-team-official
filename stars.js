/**
 * محرك الفضاء الكوني الواقعي ثلاثي الأبعاد (Hyper-Realistic Deep Space Cosmic Engine)
 * يوفر سماء فلكية واقعية عميقة مع:
 * - سواد كوني فاحم عالي التباين (Deep Interstellar Void)
 * - حركة كونية مستمرة بانعدام الجاذبية (Autonomous Zero-G Drift) تمنح الفضاء حياة وحركة دائمة
 * - طبقات نجوم ثلاثية الأبعاد (Multi-Layer Parallax) بألوان طيفية واقعية (O/B/A/F/G/K)
 * - نجوم ساطعة مع أشعة انكسار فلكية متقاطعة بتأثير تلسكوبات الفضاء (4-Point Diffraction Cross Spikes ✦)
 * - ذرات غبار كوني سابحة (Floating Cosmic Stardust) تتأرجح بخفة في سكون الفضاء
 * - نظام شهب واقعية سريعة وشهب نارية عملاقة (Dynamic Meteors & Bolide Fireballs) مع تفاعل بالنقرات والحركة
 * - سحب سديمية كتلية غاية في النعومة والعمق
 */

(function () {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // إعدادات الكثافة والعمق (عدد نجوم متناسق وهادئ وموزع بجمالية)
    const STAR_COUNT = Math.max(90, Math.floor(Math.min(width, height) * 0.18));
    const DUST_COUNT = 20;
    const stars = [];
    const stardust = [];

    let mouse = {
        x: width / 2,
        y: height / 2,
        targetX: width / 2,
        targetY: height / 2,
        lastX: width / 2,
        lastY: height / 2,
        speed: 0
    };

    // اتجاه الانجراف الكوني المستمر (Autonomous Cosmic Drift in Zero Gravity)
    const driftAngle = -0.42; // حركة انسيابية مائلة هادئة نحو الأفق
    const driftSpeed = 0.14;
    const driftVx = Math.cos(driftAngle) * driftSpeed;
    const driftVy = Math.sin(driftAngle) * driftSpeed;

    // فئة النجم الأبيض الواقعي (Pure White Astronomical Star)
    class Star {
        constructor() {
            this.init(true);
        }

        init(randomizePosition = false) {
            this.x = randomizePosition ? Math.random() * width : (driftVx > 0 ? -20 : width + 20);
            this.y = randomizePosition ? Math.random() * height : (driftVy > 0 ? -20 : height + 20);

            // نجوم بيضاء نقية دائرية بتدرجات أحجام فلكية طبيعية (بدون أي خطوط متقاطعة)
            const typeRoll = Math.random();
            if (typeRoll < 0.70) {
                // نجم أبيض سحيق هادئ
                this.type = 'micro';
                this.size = Math.random() * 0.45 + 0.35;
                this.layer = Math.random() * 0.6 + 0.5;
                this.baseAlpha = Math.random() * 0.5 + 0.3;
            } else if (typeRoll < 0.92) {
                // نجم أبيض متوسط ناصع
                this.type = 'medium';
                this.size = Math.random() * 0.65 + 0.8;
                this.layer = Math.random() * 0.8 + 1.2;
                this.baseAlpha = Math.random() * 0.4 + 0.55;
            } else {
                // نجم أبيض كبير ناصع دائري
                this.type = 'giant';
                this.size = Math.random() * 0.75 + 1.4;
                this.layer = Math.random() * 1.0 + 2.0;
                this.baseAlpha = Math.random() * 0.3 + 0.7;
            }

            this.alpha = this.baseAlpha;
            this.twinkleSpeed = Math.random() * 0.022 + 0.008;
            this.twinkleFactor = Math.random() * Math.PI * 2;
        }

        update() {
            // تلألؤ النجوم الحي (Life-like organic twinkling)
            this.twinkleFactor += this.twinkleSpeed;
            const variance = this.type === 'giant' ? 0.35 : 0.28;
            this.alpha = this.baseAlpha + Math.sin(this.twinkleFactor) * variance;
            if (this.alpha < 0.12) this.alpha = 0.12;
            if (this.alpha > 1) this.alpha = 1;

            // الانجراف الفضائي المستمر في انعدام الجاذبية
            this.x += driftVx * this.layer;
            this.y += driftVy * this.layer;

            // إزاحة الماوس/اللمس ثلاثية الأبعاد (3D Parallax Depth)
            const mouseDx = (mouse.x - width / 2) * (0.01 * this.layer);
            const mouseDy = (mouse.y - height / 2) * (0.01 * this.layer);
            this.renderX = this.x - mouseDx;
            this.renderY = this.y - mouseDy;

            // تدوير النجوم بسلاسة عند مغادرة حدود الشاشة
            const margin = 40;
            if (this.x < -margin) this.x = width + margin;
            else if (this.x > width + margin) this.x = -margin;
            if (this.y < -margin) this.y = height + margin;
            else if (this.y > height + margin) this.y = -margin;
        }

        draw() {
            // رسم النواة البيضاء الدائرية الساطعة
            ctx.beginPath();
            ctx.arc(this.renderX, this.renderY, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.fill();

            // هالة ضوئية بيضاء دائرية ناعمة للنجوم الأكبر (بدون أي خطوط أو تقاطعات)
            if (this.size > 1.0) {
                ctx.beginPath();
                ctx.arc(this.renderX, this.renderY, this.size * 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.16})`;
                ctx.fill();
            }
        }
    }

    // فئة ذرات الغبار الكوني السابحة (Floating Cosmic Stardust Motes)
    class CosmicDust {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 1.1 + 0.4;
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = (Math.random() - 0.5) * 0.15;
            this.alpha = Math.random() * 0.35 + 0.15;
            this.baseAlpha = this.alpha;
            this.color = 'rgba(255, 255, 255, ';
            this.pulse = Math.random() * Math.PI * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulse += 0.015;
            this.alpha = this.baseAlpha + Math.sin(this.pulse) * 0.15;

            // حركة براونية خفيفة وتجاوب مع حركة الماوس
            const dx = (mouse.x - width / 2) * 0.003;
            const dy = (mouse.y - height / 2) * 0.003;
            this.renderX = this.x - dx;
            this.renderY = this.y - dy;

            if (this.x < 0) this.x = width;
            else if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            else if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.renderX, this.renderY, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + Math.max(0.05, this.alpha) + ')';
            ctx.fill();
        }
    }

    // فئة الشهب الفلكية والشهب النارية العملاقة (Meteors & Bolide Fireballs)
    class DynamicMeteor {
        constructor() {
            this.active = false;
        }

        spawn(forcedAngle = null, originX = null, originY = null) {
            this.active = true;
            this.isBolide = Math.random() < 0.22; // 22% فرصة لظهور شهاب ناري عملاق وساطع

            // زاوية الشهاب الطبيعية
            const angle = forcedAngle !== null ? forcedAngle : (Math.PI / 4 + (Math.random() * 0.3 - 0.15));
            this.angle = angle;

            this.speed = this.isBolide ? (Math.random() * 8 + 14) : (Math.random() * 9 + 18);
            this.dx = Math.cos(angle) * this.speed;
            this.dy = Math.sin(angle) * this.speed;

            this.length = this.isBolide ? (Math.random() * 90 + 130) : (Math.random() * 70 + 80);
            this.opacity = 1.0;
            this.fadeSpeed = this.isBolide ? 0.012 : 0.022;

            // موقع الانطلاق
            if (originX !== null && originY !== null) {
                this.x = originX;
                this.y = originY;
            } else {
                this.x = Math.random() * (width * 1.1) - (width * 0.1);
                this.y = Math.random() * (height * 0.35) - 30;
            }

            // ألوان البلازما المتوهجة البيضاء النقية
            this.headColor = '#ffffff';
            this.plasmaColor = 'rgba(255, 255, 255, ';
            this.lineWidth = this.isBolide ? 2.2 : 1.5;
        }

        update() {
            if (!this.active) return;
            this.x += this.dx;
            this.y += this.dy;
            this.opacity -= this.fadeSpeed;

            if (this.opacity <= 0 || this.x < -100 || this.x > width + 200 || this.y > height + 200) {
                this.active = false;
            }
        }

        draw() {
            if (!this.active || this.opacity <= 0) return;

            const tailX = this.x - (Math.cos(this.angle) * this.length);
            const tailY = this.y - (Math.sin(this.angle) * this.length);

            // تدرج الذيل المتأين المتوهج (Ion Plasma Trail)
            const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
            gradient.addColorStop(0, this.plasmaColor + this.opacity + ')');
            gradient.addColorStop(0.3, this.plasmaColor + (this.opacity * 0.6) + ')');
            gradient.addColorStop(1, this.plasmaColor + '0)');

            ctx.save();
            ctx.lineCap = 'round';
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = gradient;

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            // رأس الشهاب المتوهج
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.isBolide ? 2.8 : 1.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.shadowColor = this.plasmaColor + '1)';
            ctx.shadowBlur = this.isBolide ? 16 : 8;
            ctx.fill();

            // هالة إضافية للشهب العملاقة
            if (this.isBolide) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
                ctx.fillStyle = this.plasmaColor + (this.opacity * 0.35) + ')';
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // توليد النجوم
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
    }

    // توليد ذرات الغبار الكوني
    for (let i = 0; i < DUST_COUNT; i++) {
        stardust.push(new CosmicDust());
    }

    // إدارة مسبار الشهب المتكرر
    const meteors = [new DynamicMeteor(), new DynamicMeteor(), new DynamicMeteor(), new DynamicMeteor()];
    function spawnMeteorOccasionally() {
        const inactive = meteors.find(m => !m.active);
        if (inactive) {
            inactive.spawn();
        }
        // ظهور شهاب طبيعي كل 2.5 إلى 5.5 ثوانٍ
        const nextInterval = Math.random() * 3000 + 2500;
        setTimeout(spawnMeteorOccasionally, nextInterval);
    }
    setTimeout(spawnMeteorOccasionally, 1500);

    // سحب سديمية كتلية عضوية على الكانفاس (Organic Canvas Deep Nebula Dust)
    let nebulaAngle = 0;
    function drawDeepCanvasNebulae() {
        nebulaAngle += 0.002;
        const pulse = Math.sin(nebulaAngle) * 30;

        // سديم عميق ناعم 1 (غبار فضائي خافت جداً متناغم مع النجوم البيضاء)
        const rad1 = Math.max(width, height) * 0.28 + pulse;
        const grad1 = ctx.createRadialGradient(width * 0.25, height * 0.3, 0, width * 0.25, height * 0.3, rad1);
        grad1.addColorStop(0, 'rgba(255, 255, 255, 0.015)');
        grad1.addColorStop(0.5, 'rgba(255, 255, 255, 0.005)');
        grad1.addColorStop(1, 'transparent');
        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        // سديم عميق ناعم 2 (هالة فلكية خافتة)
        const rad2 = Math.max(width, height) * 0.32 - pulse;
        const grad2 = ctx.createRadialGradient(width * 0.78, height * 0.65, 0, width * 0.78, height * 0.65, rad2);
        grad2.addColorStop(0, 'rgba(255, 255, 255, 0.012)');
        grad2.addColorStop(0.6, 'rgba(255, 255, 255, 0.003)');
        grad2.addColorStop(1, 'transparent');
        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);
    }

    // تكييف الشاشة عند تغيير الحجم
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        stars.length = 0;
        const newCount = Math.max(90, Math.floor(Math.min(width, height) * 0.18));
        for (let i = 0; i < newCount; i++) {
            stars.push(new Star());
        }
    });

    // تفاعل الماوس / اللمس السلس
    window.addEventListener('mousemove', (e) => {
        const dx = e.clientX - mouse.lastX;
        const dy = e.clientY - mouse.lastY;
        mouse.speed = Math.sqrt(dx * dx + dy * dy);

        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
        mouse.lastX = e.clientX;
        mouse.lastY = e.clientY;

        // عند تحريك الماوس بسرعة عالية، ينطلق شهاب تفاعلي متزامن
        if (mouse.speed > 55) {
            const inactive = meteors.find(m => !m.active);
            if (inactive) {
                const flickAngle = Math.atan2(dy, dx);
                inactive.spawn(flickAngle, e.clientX, e.clientY);
                mouse.speed = 0;
            }
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            mouse.targetX = e.touches[0].clientX;
            mouse.targetY = e.touches[0].clientY;
        }
    }, { passive: true });

    // إطلاق شهاب عند النقر على الفضاء
    window.addEventListener('click', (e) => {
        // إذا لم يكن النقر على زر أو رابط
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A' && !e.target.closest('button, a, input')) {
            const inactive = meteors.find(m => !m.active);
            if (inactive) {
                const angle = Math.PI / 4 + (Math.random() * 0.4 - 0.2);
                inactive.spawn(angle, e.clientX - 60, e.clientY - 60);
            }
        }
    });

    // حلقة الحركة الرئيسية (Main Cosmic Animation Loop)
    let isRunning = true;
    function animate() {
        if (!isRunning) return;

        // تنعيم حركة الماوس بالقصور الذاتي (Smooth Lerp)
        mouse.x += (mouse.targetX - mouse.x) * 0.045;
        mouse.y += (mouse.targetY - mouse.y) * 0.045;

        // مسح الكانفاس بملء أسود فضائي تام عالي التباين (Pitch Black Deep Void)
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // رسم السدم الكتلية العميقة بالكانفاس
        drawDeepCanvasNebulae();

        // رسم ذرات الغبار الكوني
        for (let i = 0; i < stardust.length; i++) {
            stardust[i].update();
            stardust[i].draw();
        }

        // رسم النجوم بجميع طبقاتها وتأثيراتها
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].draw();
        }

        // رسم الشهب والشهب النارية
        for (let i = 0; i < meteors.length; i++) {
            meteors[i].update();
            meteors[i].draw();
        }

        requestAnimationFrame(animate);
    }

    animate();

    // إمكانية إيقاف التأثير لتوفير الأداء عبر زر الفوتر
    window.toggleCosmicStars = function (forceState) {
        if (typeof forceState === 'boolean') {
            isRunning = forceState;
        } else {
            isRunning = !isRunning;
        }
        if (isRunning) animate();
        return isRunning;
    };
})();
