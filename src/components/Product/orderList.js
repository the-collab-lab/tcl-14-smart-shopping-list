import React from 'react';
import firebase from '@firebase/app';
import { FirestoreCollection } from 'react-firestore';
import listProduct from './ListProduct';
import _ from 'lodash';

export default function orderList() {
  const orderedArray = _.orderBy(dataFromFirebase, [], []);

  var users = [
    { estimates: 7, user: 'zorro', age: 48 },
    { estimates: 7, user: 'acelgas', age: 48 },
    { estimates: 7, user: 'brocoli', age: 34 },
    { estimates: 14, user: 'pizza', age: 40 },
    { estimates: 7, user: 'perros', age: 36 },
    { estimates: 14, user: 'gatos', age: 36 },
    { estimates: 30, user: 'pinguino', age: 36 },
  ];

  _.orderBy(users, ['estimates', 'user'], ['asc', 'asc']);
}
