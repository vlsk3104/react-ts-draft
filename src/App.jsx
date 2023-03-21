import React, { useState } from 'react';
import './sheet.css';

const App = () => {
  const [items, setItems] = useState([
    { itemName: '品名〇〇〇〇〇', unitPrice: 1000, amount: 3, subtotal: 3000 },
    { itemName: '品名〇〇〇〇〇', unitPrice: 1000, amount: 5, subtotal: 5000 },
    { itemName: '品名〇〇〇〇〇', unitPrice: 1000000, amount: 2, subtotal: 2000000 },
  ]);

  const handleInput = (index, field, event) => {
    const newItems = [...items];
    newItems[index][field] = event.target.textContent;
    setItems(newItems);
  };
  console.log(items)

  return (
    <section className="sheet">
      <div className="row_1">
        <h1 className="text-center">御請求書</h1>
      </div>
      <div className="row_2">
        <ul className="text-right">
          <li>No 00-0000</li>
          <li>2017年4月15日</li>
        </ul>
      </div>
      <div className="row_3">
        <div className="col_1">
          <ul>
            <li>
              <h2 className="customer_name">あいうえお株式会社 御中</h2>
            </li>
            <li>〒000-0000</li>
            <li>東京都千代田区〇〇〇〇〇〇</li>
          </ul>
        </div>
        <div className="col_2">
          <ul>
            <li>
              <h2>かきくけこ商事株式会社</h2>
            </li>
            <li>〒000-0000</li>
            <li>東京都千代田区〇〇〇〇〇〇</li>
            <li>〇〇〇〇ビル〇Ｆ</li>
            <li>TEL: 00-0000-0000</li>
            <li>FAX: 00-0000-0000</li>
          </ul>
          {/* <img className="stamp" src="stamp.png" alt="stamp" /> */}
        </div>
        <div className="clear-element"></div>
      </div>
      <div className="row_4">
        <p>下記のとおりご請求申し上げます。</p>

        <table className="summary">
          <tbody>
            <tr>
              <th>合計金額</th>
              <td>\2,168,640</td>
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
          {items.map((item, index) => (
              <tr key={index} className="dataline">
                <td
                  className="text-left"
                  contentEditable="true"
                  onBlur={(event) => handleInput(index, 'itemName', event)}
                  dangerouslySetInnerHTML={{ __html: item.itemName }}
                />
                <td
                  contentEditable="true"
                  onBlur={(event) => handleInput(index, 'unitPrice', event)}
                  dangerouslySetInnerHTML={{ __html: item.unitPrice }}
                />
                <td
                  contentEditable="true"
                  onBlur={(event) => handleInput(index, 'amount', event)}
                  dangerouslySetInnerHTML={{ __html: item.amount }}
                />
                <td
                  contentEditable="true"
                  onBlur={(event) => handleInput(index, 'subtotal', event)}
                  dangerouslySetInnerHTML={{ __html: item.subtotal }}
                />
              </tr>
            ))}
            {/* 以下の行は空の行を作成します。必要に応じて追加または削除してください。 */}
            {Array(9)
              .fill(null)
              .map((_, index) => (
                <tr key={`emptyRow_${index}`} className="dataline">
                  <td> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
              ))}
            <tr>
              <td className="space" rowSpan="3" colSpan="2"></td>
              <th>小計</th>
              <td>2,008,000</td>
            </tr>
            <tr>
              <th>消費税</th>
              <td>160,640</td>
            </tr>
            <tr>
              <th>合計</th>
              <td>2,168,640</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul>
        <li>振込先</li>
        <li>名義：カ）カキクケショウジ</li>
        <li>〇〇銀行 〇〇支店 普通 00000000</li>
      </ul>
      <p>※お振込み手数料は御社ご負担にてお願い致します。</p>
    </section>
  );
};

export default App;
