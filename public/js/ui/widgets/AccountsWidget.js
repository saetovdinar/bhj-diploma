/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
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
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      if(event.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      }
      if(event.target.closest('.account')) {
        this.onSelectAccount(event)
      }
    })
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if(User.current()) {
      Account.list(null, (err, response)=>{
        if(response && response.success) {
          this.clear();
          this.renderItems(response.data);
        }
      })
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    this.element.innerHTML = `<li class="header">
    Счета
    <div class="pull-right">
        <span class="create-account label label-success">
            <span class="fa fa-plus"></span>
            Новый счёт
        </span>
    </div>
</li>`;
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(e) {
    e.preventDefault();
    this.element.querySelectorAll('.account').forEach((item) => {
      item.classList.remove('active');
    })
    e.target.closest(".account").classList.add('active');
    App.showPage( 'transactions', { account_id: e.target.closest(".account").dataset.id })
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    return `<li class="account" data-id="${item.id}">
                      <a href="#">
                        <span>${item.name}</span> /
                        <span>${item.sum} ₽</span>
                      </a>
                    </li>`
    
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItems(data){
    for(let value of data) {
      this.element.innerHTML += this.getAccountHTML(value);
    }
    
  }
}
