const Effects = {
  'chrome': {'style': 'grayscale', 'min': 0, 'max': 1, 'step': 0.1},
  'sepia': {'style': 'sepia', 'min': 0, 'max': 1, 'step': 0.1},
  'marvin': {'style': 'invert', 'min': 0, 'max': 100, 'step': 1},
  'phobos': {'style': 'blur', 'min': 0, 'max': 3, 'step': 0.1},
  'heat': {'style': 'brightness', 'min': 1, 'max': 3, 'step': 0.1},
  'none': {},
};

const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const picturePreviewWrapper = document.querySelector('.img-upload__preview');
const sliderContainer = document.querySelector('.img-upload__effect-level');

function onEffectsListClick (evt) {
  if (evt.target.matches('.effects__radio')) {
    const button = evt.target;
    const effect = button['value'];

    if (effectLevelSlider.noUiSlider) {
      effectLevelSlider.noUiSlider.destroy();
    }

    if (effect !== 'none') {
      sliderContainer.classList.remove('hidden');
      noUiSlider.create(effectLevelSlider, {
        range: {
          min: Effects[effect]['min'],
          max: Effects[effect]['max']
        },
        start: Effects[effect]['max'],
        step: Effects[effect]['step'],
        connect: 'lower'
      });

      effectLevelSlider.noUiSlider.on('update', () => {
        effectLevelValue['value'] = effectLevelSlider.noUiSlider.get();

        switch (effect) {
          case 'marvin':
            picturePreviewWrapper.style.filter = `${Effects[effect]['style']}(${effectLevelSlider.noUiSlider.get()}%)`;
            break;
          case 'phobos':
            picturePreviewWrapper.style.filter = `${Effects[effect]['style']}(${effectLevelSlider.noUiSlider.get()}px)`;
            break;
          default:
            picturePreviewWrapper.style.filter = `${Effects[effect]['style']}(${effectLevelSlider.noUiSlider.get()})`;
            break;
        }
      });
    } else {
      sliderContainer.classList.add('hidden');
      effectLevelValue['value'] = '';
      picturePreviewWrapper.style.filter = '';
    }
  }
}

export {onEffectsListClick};
