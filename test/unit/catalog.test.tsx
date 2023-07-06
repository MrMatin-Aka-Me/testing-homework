import { render, screen} from '@testing-library/react'
import {Provider} from "react-redux";
import React from "react";
import { createStore } from 'redux';
import {Catalog} from "../../src/client/pages/Catalog";
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import {Application} from "../../src/client/Application";

const basename = '/'

describe('Каталог товаров', () => {
    it ('В каталоге должны отображаться товары, список которых приходит с сервера', ()=> {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
            ]
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByRole('heading', {name: 'товар1'})).toBeInTheDocument()

        expect(screen.queryByRole('heading', {name: 'товар2'})).toBeInTheDocument()
    })

    it('на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка "добавить в корзину"', () => {
        const initState = {
            cart: {},
            products: [
                { id: 1, name: "товар1", price: 100 },
            ],
            details: {
                1: {
                    id: 1,
                    name: "товар1",
                    price: 100,
                    description: "Крутой товар",
                    material: "Рубироид",
                    color: "красный",
                }}
        }
        const store = createStore(() => initState);

        render(
            <MemoryRouter initialEntries={['/catalog/1']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        )

        expect(screen.queryByRole('heading', {name: 'товар1'})).toBeInTheDocument()
        expect(screen.queryByText('$100')).toBeInTheDocument()
        expect(screen.queryByText('Крутой товар')).toBeInTheDocument()
        expect(screen.queryByText('Рубироид')).toBeInTheDocument()
        expect(screen.queryByText('красный')).toBeInTheDocument()
        expect(screen.queryByText('Add to Cart')).toBeInTheDocument()
    })

    it ('Если товар уже добавлен в корзину, в каталоге должно отображаться сообщение об этом', () => {
        const initState = {
            cart: {1: {}},
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
            ],
            details: {
                1: {
                    id: 1,
                    name: "товар1",
                    price: 100,
                    description: "Крутой товар",
                    material: "Рубироид",
                    color: "красный",
                }}
        }
        const store = createStore(() => initState);

        render(
            <BrowserRouter basename={basename}>
                <Provider store={store}>
                    <Catalog />
                </Provider>
            </BrowserRouter>
        )

        expect(screen.queryByText('Item in cart')).toBeInTheDocument()
    })
    it ('Если товар уже добавлен в корзину, в странице товара должно отображаться сообщение об этом', () => {
        const initState = {
            cart: {1: {}},
            products: [
                { id: 1, name: "товар1", price: 100 },
                { id: 2, name: "товар2", price: 100 },
            ],
            details: {
                1: {
                    id: 1,
                    name: "товар1",
                    price: 100,
                    description: "Крутой товар",
                    material: "Рубироид",
                    color: "красный",
                }}
        }
        const store = createStore(() => initState);

        render(
            <MemoryRouter initialEntries={['/catalog/1']}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        )

        expect(screen.queryByText('Item in cart')).toBeInTheDocument()
    })
})