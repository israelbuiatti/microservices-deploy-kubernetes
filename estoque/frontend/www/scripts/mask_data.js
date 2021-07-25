window.addEventListener('load', function () {
    var input = document.querySelectorAll('.dataMascara');

    function trim(str) {
        var trim = '';
        for (var i = 0; i < str.length; i++) {
            if (str[i] !== ' ') {
                trim += str[i]
            }
        }

        return trim;
    }

    function inputing() {

        this.value = trim(this.value);

        var valNum = Number(this.value.replace('/', '').replace('/', ''));

        if (!isNaN(valNum) && this.value[this.value.length - 1] != '/') {

            var size = this.value.length;
            if (size == 2) {
                var dia = Number(this.value);
                if (dia >= 1 && dia <= 31) {
                    this.value = this.value + '/';
                } else {
                    this.value = '';
                }
            }

            if (size == 5) {
                var mes = Number(this.value.substr(3, 2));
                if (mes >= 1 && mes <= 12) {
                    this.value = this.value + '/';
                } else {
//                                                alert('mes inválido');
                    this.value = this.value.substr(0, 3);
                }
            }
            
            if (size == 7) {
                var ano = Number(this.value.substr(6, 1));
                if (ano == 2) {
                    this.value = this.value + '';
                } else {
//                                                alert('mes inválido');
                    this.value = this.value.substr(0, this.value.length - 1);
                }
            }

        } else {
            this.value = this.value.substring(0, this.value.length - 1);
        }


    }
    
    for(var k=0; k<input.length; k++){
        input[k].addEventListener('input', inputing);
        input[k].addEventListener('keyup', function (e) {
        if (e.keyCode == 8) {
            this.removeEventListener('input', inputing);
        } else {
            this.addEventListener('input', inputing);
        }
    });
    }// loop for

    


});