//Classe 
class CalcController {
    //Método construtor da classe
    constructor(){
        //Atributos da classe CalcController
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        //Métodos da classe CalcController
        this.initialize();
    }

    //Método principal
    initialize(){
        this.setDisplayDateTime();
        //Atualizando data e hora a cada segundo
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000)
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {day: '2-digit', month: 'short', year: 'numeric'});
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    //Método que retorna o valor da hora
    get displayTime(){
        return this._timeEl.innerHTML
    }

    //Método que atribui um novo valor a hora
    set displayTime(time){
        this._timeEl.innerHTML = time;
    }

    //Método que retorna o valor da data
    get displayDate(){
        return this._dateEl.innerHTML;
    }

    //Método que atribui um novo valor a data
    set displayDate(date){
        this._dateEl.innerHTML = date;
    }

    //Método que retorna o valor de _displayCalc
    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    //Método que atribui um novo valor ao _displayCalc
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = valor;
    }

    //Método que retorna o valor de _currentDate
    get currentDate(){
        return new Date();
    }

    //Método que retorna o valor de _currentDate
    set currentDate(date){
        this._currentDate = data;
    }

}