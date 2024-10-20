const counterLabelNode = document.querySelector('.counter-label')
const charCountNode = document.querySelector('#charCount')
const textAreaNode = document.getElementById('floatingTextarea')
const errorBtnNode = document.getElementById('error')
const successBtnNode = document.getElementById('success')
const TOAST_OPTIONS = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "50000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

function countCharacters(){
    textAreaNode.addEventListener('input',()=>{
        
        let charCount = textAreaNode.value.length;
        charCountNode.innerText = charCount;

        if (charCount == 100) {
            counterLabelNode.classList.add('red')
        }
        else {
            counterLabelNode.classList.remove('red');
        }
    })
}

countCharacters()


errorBtnNode.addEventListener('click',()=>{
    $(document).ready(function() {
        toastr.warning('Не удается установить подключение');
        toastr.options = TOAST_OPTIONS 
      });
})

successBtnNode.addEventListener('click',()=>{
    $(document).ready(function() {
        toastr.options.timeOut = 3000; // 1.5s
        toastr.success('Подключение восстановлено');
        toastr.options = TOAST_OPTIONS
      });
})
