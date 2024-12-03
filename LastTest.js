import React, { useState } from "react";

export default function LastTest() {
  const [searchText, Search] = useState("");
  const [selectedGame, Selected] = useState(null);
  const [Payment, Pay] = useState(false);
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState(["", "", "", ""]);
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [ownedGames, setOwnedGames] = useState([]); // 보유 게임

  const games = [
    {
      id: 1,
      name: "EA SPORTS FC™ 25",
      image: "Fifa.jpg",
      description: "게임1 설명",
      url: "https://namu.wiki/w/EA%20SPORTS%20FC%E2%84%A2%2025",
    },
    {
      id: 2,
      name: "Hollow Knight",
      image: "Hollow.jpg",
      description: "게임2 설명",
      url: "https://namu.wiki/w/Hollow%20Knight?from=%ED%95%A0%EB%A1%9C%EC%9A%B0%20%EB%82%98%EC%9D%B4%ED%8A%B8",
    },
    {
      id: 3,
      name: "Nine Sols",
      image: "Nine.jpg",
      description: "게임3 설명",
      url: "https://namu.wiki/w/Nine%20Sols?from=%EB%82%98%EC%9D%B8%20%EC%86%94%EC%A6%88",
    },
  ];

  const generateCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 12 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join("");
  };

  const CardNum = (index, value) => {
    const updatedCardNumber = [...cardNumber];
    updatedCardNumber[index] = value.slice(0, 4);
    setCardNumber(updatedCardNumber);
  };

  const Purchase = () => {
    if (ownedGames.some((game) => game.id === selectedGame.id)) {
      alert("이미 이 게임을 보유 중입니다.");
      Pay(false);
    } else {
      const newCode = generateCode();
      setOwnedGames([...ownedGames, { id: selectedGame.id, code: newCode }]);
      alert(`결제가 완료되었습니다. 코드: ${newCode}`);
      Pay(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="검색창"
          value={searchText}
          onChange={(e) => Search(e.target.value)}
        />
      </div>

      <div>
        <h2>게임 목록</h2>
        <ul>
          {games
            .filter((game) =>
              game.name.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((game) => (
              <li key={game.id}>
                <button onClick={() => Selected(game)}>{game.name}</button>
              </li>
            ))}
        </ul>
      </div>

      {selectedGame && (
        <div>
          <div>
            <img
              src={selectedGame.image}
              alt={selectedGame.name}
              style={{
                width: "300px",
                height: "200px", // 사진 크기만 설정
              }}
            />
          </div>
          <div>
            <h3>{selectedGame.name}</h3>
            <p>
              {selectedGame.description}{" "}
              <a href={selectedGame.url} target="_blank" rel="noreferrer">
                (외부 링크)
              </a>
            </p>
            <button onClick={() => Pay(true)}>결제하기</button>
            {ownedGames.some((game) => game.id === selectedGame.id) && (
              <div>
                <strong>보유 코드:</strong>{" "}
                {
                  ownedGames.find((game) => game.id === selectedGame.id).code
                }
              </div>
            )}
          </div>
        </div>
      )}

      {Payment && (
        <div>
          <h2>결제 정보 입력</h2>

          <div>
            <label>
              카드정보:
              <select
                value={cardType}
                onChange={(e) => setCardType(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  카드정보
                </option>
                <option value="visa">Visa</option>
                <option value="master">Master</option>
              </select>
            </label>
          </div>

          <div>
            <label>카드번호:</label>
            <div>
              {cardNumber.map((num, index) => (
                <input
                  key={index}
                  type="text"
                  value={num}
                  onChange={(e) => CardNum(index, e.target.value)}
                  maxLength="4"
                />
              ))}
            </div>
          </div>

          <div>
            <label>CVC:</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.slice(0, 3))}
              maxLength="3"
            />
          </div>

          <div>
            <label>이름:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <button onClick={Purchase}>결제</button>
            <button onClick={() => Pay(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
