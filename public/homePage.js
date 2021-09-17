// Logout
let logoutButton = new LogoutButton();
logoutButton.action = () => {
	ApiConnector.logout(response => {
		console.log(response);
		if (response.success) {
			location.reload();
		}
	})
}

// Profile
ApiConnector.current(response => {
	console.log(response);
	if (response.success) {
		ProfileWidget.showProfile(response.data);
	}
})

// Currency rates
let ratesBoard = new RatesBoard();
ratesBoard.requestCurrencyRates = () => {
	ApiConnector.getStocks(response => {
		console.log(response)
		if (response.success) {
			ratesBoard.clearTable()
			ratesBoard.fillTable(response.data)
		}
	})
}
ratesBoard.requestCurrencyRates();
setInterval(() => ratesBoard.requestCurrencyRates(), 60000);

// Money transactions
let moneyManager = new MoneyManager();

// Balance
moneyManager.addMoneyCallback = data => {
	ApiConnector.addMoney(data, response => {
		console.log(response)
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Баланс успешно пополнен");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	})
}
// Currency conversion
moneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		console.log(response)
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Обмен успешно произведен");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	})
}
// Money transfer
moneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		console.log(response)
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Средства успешно переведены");
		} else {
			moneyManager.setMessage(response.success, response.error);
		}
	})
}

// Favourites
let favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
	console.log(response)
	if (response.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
})
favoritesWidget.addUserCallback = data => {
	ApiConnector.addUserToFavorites(data, response => {
		console.log(response)
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, "Пользователь успешно добавлен в адресную книгу");
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
		
	})
}
favoritesWidget.removeUserCallback = data => {
	ApiConnector.removeUserFromFavorites(data, response => {
		console.log(response)
		if (response.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			favoritesWidget.setMessage(response.success, "Пользователь удален из адресной книги");
		} else {
			favoritesWidget.setMessage(response.success, response.error);
		}
	})
}