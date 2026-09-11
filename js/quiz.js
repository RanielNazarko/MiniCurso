/**
 * Sistema simples de quizzes objetivos
 * Minicurso - Inovação Tecnológica e Empreendedorismo
 */

function checkQuiz(quizId) {
  const quiz = document.getElementById(quizId);
  if (!quiz) return;

  const questions = quiz.querySelectorAll('.question');
  let correct = 0;
  let total = questions.length;

  questions.forEach((q) => {
    const correctAnswer = q.dataset.answer;
    const selected = q.querySelector('input[type="radio"]:checked');
    const options = q.querySelectorAll('.option');
    const feedback = q.querySelector('.feedback');

    // limpa estilos anteriores
    options.forEach(opt => {
      opt.classList.remove('correct', 'incorrect');
    });
    if (feedback) {
      feedback.classList.remove('show', 'success', 'error');
    }

    if (!selected) {
      if (feedback) {
        feedback.textContent = 'Selecione uma alternativa.';
        feedback.classList.add('show', 'error');
      }
      return;
    }

    const chosen = selected.value;

    options.forEach(opt => {
      const input = opt.querySelector('input');
      if (input.value === correctAnswer) {
        opt.classList.add('correct');
      }
      if (input.checked && input.value !== correctAnswer) {
        opt.classList.add('incorrect');
      }
    });

    if (chosen === correctAnswer) {
      correct++;
      if (feedback) {
        feedback.textContent = '✓ Correto! ' + (q.dataset.explanation || '');
        feedback.classList.add('show', 'success');
      }
    } else {
      if (feedback) {
        feedback.textContent = '✗ Incorreto. ' + (q.dataset.explanation || 'Revise o conteúdo da aula.');
        feedback.classList.add('show', 'error');
      }
    }
  });

  const scoreBox = quiz.querySelector('.score-box');
  if (scoreBox) {
    const scoreEl = scoreBox.querySelector('.score');
    const msgEl = scoreBox.querySelector('.score-msg');
    if (scoreEl) scoreEl.textContent = correct + ' / ' + total;

    let msg = '';
    const pct = (correct / total) * 100;
    if (pct === 100) msg = 'Excelente! Você dominou o conteúdo.';
    else if (pct >= 70) msg = 'Muito bem! Continue revisando os pontos que errou.';
    else if (pct >= 40) msg = 'Bom começo. Releia as seções principais e tente novamente.';
    else msg = 'Revise o material com atenção e refaça a atividade.';

    if (msgEl) msgEl.textContent = msg;
    scoreBox.classList.add('show');
  }
}

function resetQuiz(quizId) {
  const quiz = document.getElementById(quizId);
  if (!quiz) return;

  quiz.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
  quiz.querySelectorAll('.option').forEach(o => o.classList.remove('correct', 'incorrect'));
  quiz.querySelectorAll('.feedback').forEach(f => {
    f.classList.remove('show', 'success', 'error');
    f.textContent = '';
  });
  const scoreBox = quiz.querySelector('.score-box');
  if (scoreBox) scoreBox.classList.remove('show');
}