import { PropsWithChildren } from 'react'
import HeaderNew from './header/HeaderNew'
import SidebarNew from './sidebar/SidebarNew'

export default function DashboardLayoutNew({
	children,
}: PropsWithChildren<unknown>) {
	return (
		<>
			<SidebarNew />
			<main className='w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main'>
				<HeaderNew />
				{children}
				<div
					className='overflow-auto p-6
m-6 b-1'
				>
					<table>
						<thead>
							<tr>
								<th>Заголовок 1</th>
								<th>Заголовок 2</th>
								<th>Заголовок 3</th>
								<th>Заголовок 4</th>
								<th>Заголовок 5</th>
								<th>Заголовок 6</th>
								<th>Заголовок 7</th>
								<th>Заголовок 8</th>
								<th>Заголовок 9</th>
								<th>Заголовок 10</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Яблоко</td>
								<td>Банан</td>
								<td>Апельсин</td>
								<td>Груша</td>
								<td>Арбуз</td>
								<td>Виноград</td>
								<td>Ананас</td>
								<td>Киви</td>
								<td>Персик</td>
								<td>Манго</td>
							</tr>
							<tr>
								<td>Картошка</td>
								<td>Морковь</td>
								<td>Огурец</td>
								<td>Помидор</td>
								<td>Перец</td>
								<td>Лук</td>
								<td>Чеснок</td>
								<td>Капуста</td>
								<td>Брокколи</td>
								<td>Сельдерей</td>
							</tr>
							<tr>
								<td>Собака</td>
								<td>Кошка</td>
								<td>Хомяк</td>
								<td>Кролик</td>
								<td>Попугай</td>
								<td>Хорек</td>
								<td>Рыбка</td>
								<td>Черепаха</td>
								<td>Хомяк</td>
								<td>Кролик</td>
							</tr>
							<tr>
								<td>Стол</td>
								<td>Стул</td>
								<td>Диван</td>
								<td>Кровать</td>
								<td>Шкаф</td>
								<td>Тумбочка</td>
								<td>Комод</td>
								<td>Столешница</td>
								<td>Полка</td>
								<td>Кресло</td>
							</tr>
							<tr>
								<td>Солнце</td>
								<td>Луна</td>
								<td>Звезда</td>
								<td>Планета</td>
								<td>Метеорит</td>
								<td>Комета</td>
								<td>Галактика</td>
								<td>Черная дыра</td>
								<td>Созвездие</td>
								<td>Астероид</td>
							</tr>
							<tr>
								<td>Море</td>
								<td>Океан</td>
								<td>Река</td>
								<td>Озеро</td>
								<td>Пруд</td>
								<td>Бассейн</td>
								<td>Фонтан</td>
								<td>Водопад</td>
								<td>Пар</td>
								<td>Кристалл</td>
							</tr>
							<tr>
								<td>Автомобиль</td>
								<td>Велосипед</td>
								<td>Мотоцикл</td>
								<td>Самолет</td>
								<td>Поезд</td>
								<td>Трамвай</td>
								<td>Автобус</td>
								<td>Лодка</td>
								<td>Яхта</td>
								<td>Вертолет</td>
							</tr>
							<tr>
								<td>Книга</td>
								<td>Журнал</td>
								<td>Газета</td>
								<td>Энциклопедия</td>
								<td>Словарь</td>
								<td>Атлас</td>
								<td>Учебник</td>
								<td>Справочник</td>
								<td>Роман</td>
								<td>Поэма</td>
							</tr>
							<tr>
								<td>Шарик</td>
								<td>Кубик</td>
								<td>Конструктор</td>
								<td>Кукла</td>
								<td>Машинка</td>
								<td>Пазл</td>
								<td>Мяч</td>
								<td>Книжка</td>
								<td>Маркер</td>
								<td>Карандаш</td>
							</tr>
							<tr>
								<td>Лето</td>
								<td>Зима</td>
								<td>Весна</td>
								<td>Осень</td>
								<td>Холод</td>
								<td>Жара</td>
								<td>Дождь</td>
								<td>Снег</td>
								<td>Ветер</td>
								<td>Молния</td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		</>
	)
}
