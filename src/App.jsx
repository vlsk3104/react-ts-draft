import React, { useState } from 'react';
import './sheet.css';

const App = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('No 00-0000');
  const [invoiceDate, setInvoiceDate] = useState('2017年4月15日');
  const [customerAddress, setCustomerAddress] = useState('〒000-0000\n東京都千代田区〇〇〇〇〇〇');
  const [ourCompanyAddress, setOurCompanyAddress] = useState('〒000-0000\n東京都千代田区');
  const [items, setItems] = useState([
    { id: 1, name: '品名〇〇〇〇〇', unitPrice: 1000, amount: 3 },
    { id: 2, name: '品名〇〇〇〇〇', unitPrice: 1000, amount: 5 },
    { id: 3, name: '品名〇〇〇〇〇', unitPrice: 1000000, amount: 2 },
    { id: 4, name: '品名〇〇〇〇〇', unitPrice: 1000, amount: 3 },
    { id: 5, name: '品名〇〇〇〇〇', unitPrice: 1000, amount: 5 },
    { id: 6, name: '品名〇〇〇〇〇', unitPrice: 1000000, amount: 2 },
    { id: 7, name: '品名〇〇〇〇〇', unitPrice: 1000, amount: 3 },
    { id: 8, name: '品名〇〇〇〇〇', unitPrice: 1000, amount: 5 },
    { id: 9, name: '品名〇〇〇〇〇', unitPrice: 1000000, amount: 2 },
    { id: 10, name: '品名〇〇〇〇〇', unitPrice: 1000, amount: 3 },
    { id: 11, name: '品名〇〇〇〇〇', unitPrice: 1000, amount: 5 },
    { id: 12, name: '品名〇〇〇〇〇', unitPrice: 1000000, amount: 2 },
  ]);

  const handleItemChange = (id, field, value) => {
    const newItems = items.map((item) => {
      if (value === '' && item.id === id) {
        return { id, name: '', unitPrice: 0, amount: 0 }
      }
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(newItems);
  };

  const subTotal = items.reduce((acc, item) => acc + item.unitPrice * item.amount, 0);
  const tax = subTotal * 0.1;
  const total = subTotal + tax;

  console.log(items)

  return (
    <section className="sheet">
      <div className="row_1">
        <h1 className="text-center" contentEditable suppressContentEditableWarning onBlur={(e) => console.log(e.target.textContent)}>御請求書</h1>
      </div>
      <div className="row_2">
        <ul className="text-right">
          <li contentEditable suppressContentEditableWarning onBlur={(e) => setInvoiceNumber(e.target.textContent)}>{invoiceNumber}</li>
          <li contentEditable suppressContentEditableWarning onBlur={(e) => setInvoiceDate(e.target.textContent)}>{invoiceDate}</li>
        </ul>
      </div>
      <div className="row_3">
        <div className="col_1">
          <ul>
            <li>
              <h2 className="customer_name" contentEditable suppressContentEditableWarning onBlur={(e) => console.log(e.target.textContent)}>あいうえお株式会社 御中</h2>
            </li>
            <li contentEditable suppressContentEditableWarning onBlur={(e) => setCustomerAddress(e.target.textContent)}>{customerAddress}</li>
            <li>小石川2-2-22 〇〇〇〇ビル〇Ｆ</li>
            <li>担当: テスト花子 様</li>
          </ul>
        </div>
        <div className="col_2">
          <ul>
            <li>
              <h2 contentEditable suppressContentEditableWarning onBlur={(e) => console.log(e.target.textContent)}>かきくけこ商事株式会社</h2>
            </li>
            <li contentEditable suppressContentEditableWarning onBlur={(e) => setOurCompanyAddress(e.target.textContent)}>{ourCompanyAddress}</li>
            <li>小石川1-1-11 〇〇〇〇ビル〇Ｆ</li>
            <li>TEL: 00-0000-0000</li>
            <li>E-mail: test@example.com</li>
            <li>担当: テスト太郎</li>
            <li>https://www.yahoo.co.jp/</li>
          </ul>
          {/* <img className="stamp" src="stamp.png" alt="Stamp" /> */}
        </div>
        <div className="clear-element"></div>
      </div>

      <div className="row_4">
        <p contentEditable suppressContentEditableWarning onBlur={(e) => console.log(e.target.textContent)}>下記のとおりご請求申し上げます。</p>

        <table className="summary">
          <tbody>
            <tr>
              <th>合計金額</th>
              <td>{total.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="row_5">
        <table className="detail">
          <thead>
            <tr>
              <th className="item">品名</th>
              <th className="unit_price">単価</th>
              <th className="amount">数量</th>
              <th className="subtotal">金額</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="dataline">
                <td
                  className="text-left"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => handleItemChange(item.id, 'name', e.target.textContent)}
                >
                  {item.name}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  onFocus={(e) => e.target.textContent = Number(e.target.textContent.replace(/,/g, ''))}
                  onBlur={(e) => {
                    if (isNaN(e.target.textContent)) {
                      alert('半角数字を入力してください')
                      e.target.textContent = item.unitPrice
                      return
                    }
                    handleItemChange(item.id, 'unitPrice', Number(e.target.textContent));
                    if (Number(e.target.textContent).toLocaleString('ja-JP') === '0' && item.name === '') {
                      e.target.textContent = ''
                      return
                    }
                    e.target.textContent = Number(e.target.textContent).toLocaleString('ja-JP');
                  }}
                >
                  {item.unitPrice === 0 ? '' : item.unitPrice.toLocaleString('ja-JP')}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => {
                    if (isNaN(e.target.textContent)) {
                      alert('半角数字を入力してください')
                      e.target.textContent = item.amount
                      return
                    }
                    handleItemChange(item.id, 'amount', Number(e.target.textContent))
                  }}
                >
                  {item.amount === 0 ? '' : item.amount}
                </td>
                <td>
                  {((item.unitPrice * item.amount) !== 0) && (item.unitPrice * item.amount).toLocaleString('ja-JP')}
                </td>
              </tr>
            ))}
            <tr>
              <td className="space" rowSpan="3" colSpan="2"></td>
              <th>小計</th>
              <td>{subTotal.toLocaleString('ja-JP')}</td>
            </tr>
            <tr>
              <th>消費税</th>
              <td>{tax.toLocaleString('ja-JP')}</td>
            </tr>
            <tr>
              <th>合計</th>
              <td>{total.toLocaleString('ja-JP')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul>
        <li contentEditable suppressContentEditableWarning onBlur={(e) => console.log(e.target.textContent)}>振込先</li>
        <li contentEditable suppressContentEditableWarning onBlur={(e) => console.log(e.target.textContent)}>名義：カ）カキクケショウジ</li>
        <li contentEditable suppressContentEditableWarning onBlur={(e) => console.log(e.target.textContent)}>〇〇銀行 〇〇支店 普通 00000000</li>
      </ul>
      <p contentEditable suppressContentEditableWarning onBlur={(e) => console.log(e.target.textContent)}>※お振込み手数料は御社ご負担にてお願い致します。</p>

    </section>
  );
};

export default App;
