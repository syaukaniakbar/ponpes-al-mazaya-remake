<div class="py-4" wire:ignore>
    <div 
        x-data="{ 
            progress: 0,
            isProcessing: false,
            init() {
                // Find the modal submit button
                const btn = $el.closest('.fi-modal').querySelector('button[type=submit]');
                if (btn) {
                    btn.addEventListener('click', () => {
                        this.start();
                    });
                }
            },
            start() {
                this.isProcessing = true;
                this.progress = 0;
                this.simulateProgress();
            },
            simulateProgress() {
                if (this.progress < 90) {
                    this.progress += Math.random() * 10;
                    if (this.progress > 90) this.progress = 90;
                    setTimeout(() => this.simulateProgress(), 500);
                }
            }
        }"
        class="space-y-4"
    >
        <div class="flex items-center justify-between text-xs font-semibold text-primary-600 uppercase tracking-wider">
            <span x-text="isProcessing ? (progress >= 90 ? 'Sedang mengemas ZIP...' : 'Mengumpulkan gambar...') : 'Siap untuk mengunduh'"></span>
            <span x-show="isProcessing" x-text="Math.round(progress) + '%'"></span>
        </div>
        
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
            <div 
                class="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                :style="'width: ' + progress + '%'"
                :class="{ 'animate-pulse': progress >= 90 }"
            ></div>
        </div>

        <div x-show="!isProcessing" class="text-sm text-gray-600 dark:text-gray-400">
            Klik tombol di bawah untuk memulai pengemasan semua bukti transaksi menjadi satu file ZIP.
        </div>

        <div x-show="isProcessing" class="text-xs text-center text-gray-500 italic">
            Mohon jangan tutup modal atau refresh halaman hingga unduhan dimulai.
        </div>
    </div>
</div>
