const zonesContainer = document.getElementById('zones');

// 버튼 104개 자동 생성 (클릭한 구역 기억하기 기능 포함)
for (let i = 1; i <= 104; i++) {
  const btn = document.createElement('button');
  btn.textContent = `구역 ${i}`;
  btn.className = 'zone-btn';

  btn.addEventListener('click', () => {
    alert(`${btn.textContent}이(가) 선택되었습니다!`);
    // 선택된 구역 기억하기
    localStorage.setItem('selectedZone', btn.textContent);
  });

  zonesContainer.appendChild(btn);
}

// 저장 버튼 클릭 시 동작 (기록을 localStorage에 저장하는 기능 포함)
document.getElementById('save-btn').addEventListener('click', () => {
  const startDate  = document.getElementById('start-date').value;
  const endDate    = document.getElementById('end-date').value;
  const personName = document.getElementById('person-name').value;
  // ★ 메모 입력값 추가 ★
  const memo       = document.getElementById('memo').value;

  // 현재 선택된 구역 확인하기
  const selectedZone = localStorage.getItem('selectedZone');
  if (!selectedZone) {
    alert('구역을 먼저 선택해주세요!');
    return;
  }

  // 메모 필드를 포함한 record 객체 생성
  const record = {
    zone: selectedZone,
    startDate,
    endDate,
    personName,
    memo,                  // ★ 여기에 메모 저장 ★
    savedAt: new Date().toISOString()
  };

  // 기존에 저장된 기록 가져오기
  const records = JSON.parse(localStorage.getItem('zoneRecords') || '[]');
  // 새 기록 추가 후 다시 저장
  records.push(record);
  localStorage.setItem('zoneRecords', JSON.stringify(records));

  alert(
    `저장되었습니다!
구역: ${selectedZone}
시작: ${startDate}
종료: ${endDate}
담당자: ${personName}
메모: ${memo}`
  );
});
