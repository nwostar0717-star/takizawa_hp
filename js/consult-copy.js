document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('copy-consultation');
  const input = document.getElementById('consultation-message');
  const status = document.getElementById('copy-status');
  if (!button || !input || !status) return;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(input.value);
      status.textContent = 'コピーしました。LINEに貼り付けてお使いください。';
    } catch {
      input.focus();
      input.select();
      status.textContent = '文章を選択しました。端末のコピー操作でコピーしてください。';
    }
  });
});
