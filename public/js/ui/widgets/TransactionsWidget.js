/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if(!element) {
      throw new Error('Empty element!');
    }
    this.element = element;
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      if(event.target.closest('button').classList.contains('create-income-button') || event.target.classList.contains('create-income-button')) {
        App.getModal('newIncome').open();
      }
      if(event.target.closest('button').classList.contains('create-expense-button') || event.target.classList.contains('create-expense-button')) {
        App.getModal('newExpense').open();
      }
    })
  }
}
