'use client'

import Header from '@/components/Header'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">개인정보처리방침</h1>
            <p className="text-gray-600">메리얼의 개인정보 보호 정책을 안내합니다.</p>
            <p className="text-sm text-gray-500 mt-2">최종 업데이트: 2024년 1월 1일</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">㈜메리얼(이하 '회사')은 다음의 목적을 위하여 개인정보를 처리하고 있으며, 다음의 목적 이외의 용도로는 이용하지 않습니다.</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>회원가입 의사확인, 회원제 서비스 제공에 따른 본인 식별·인증</li>
                  <li>재화 또는 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공</li>
                  <li>요금결제·정산, 채권추심</li>
                  <li>고충처리, 분쟁조정을 위한 기록보존</li>
                  <li>서비스 개선, 신규 서비스 개발을 위한 통계분석</li>
                  <li>마케팅 및 광고에 활용 (동의한 경우에 한함)</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 개인정보의 처리 및 보유기간</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>회사는 정보주체로부터 개인정보를 수집할 때 동의받은 개인정보 보유·이용기간 또는 법령에 따른 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">구체적인 개인정보 처리 및 보유기간은 다음과 같습니다:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>회원가입 및 관리:</strong> 회원탈퇴 시까지 (다만, 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간)</li>
                    <li><strong>재화 또는 서비스 제공:</strong> 재화·서비스 공급완료 및 요금결제·정산완료 시까지</li>
                    <li><strong>전자상거래법에 따른 기록:</strong>
                      <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-sm">
                        <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                        <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                        <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. 개인정보의 처리 항목</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">회사는 다음의 개인정보 항목을 처리하고 있습니다:</p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">필수항목</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>이메일주소, 비밀번호</li>
                      <li>성명, 휴대전화번호</li>
                      <li>배송지 주소 (주문 시)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">선택항목</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>생년월일, 성별</li>
                      <li>마케팅 수신 동의 여부</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">자동 수집 항목</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>IP주소, 쿠키, MAC주소, 서비스 이용기록</li>
                      <li>접속 로그, 접속 기기 정보</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. 개인정보의 제3자 제공</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>회사는 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">현재 제3자 제공 현황:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>토스페이먼츠:</strong> 결제 처리를 위한 최소한의 정보 (이름, 이메일, 전화번호, 결제금액)</li>
                    <li><strong>택배회사:</strong> 배송을 위한 정보 (수령인명, 주소, 전화번호)</li>
                  </ul>
                  <p className="text-sm mt-2">※ 위 업체들과는 개인정보 처리 위탁계약을 체결하여 개인정보를 안전하게 관리하고 있습니다.</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. 개인정보처리 위탁</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-50 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">수탁업체</th>
                        <th className="px-4 py-3 text-left font-semibold">위탁업무</th>
                        <th className="px-4 py-3 text-left font-semibold">보유기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-200">
                        <td className="px-4 py-3">Supabase Inc.</td>
                        <td className="px-4 py-3">데이터베이스 관리, 파일 저장</td>
                        <td className="px-4 py-3">회원탈퇴 시 또는 위탁계약 종료 시까지</td>
                      </tr>
                      <tr className="border-t border-gray-200">
                        <td className="px-4 py-3">Vercel Inc.</td>
                        <td className="px-4 py-3">웹사이트 호스팅</td>
                        <td className="px-4 py-3">서비스 종료 시 또는 위탁계약 종료 시까지</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:</p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>개인정보 처리현황 통지요구</li>
                  <li>개인정보 처리정지 요구</li>
                  <li>개인정보의 정정·삭제 요구</li>
                  <li>손해배상 청구</li>
                </ul>

                <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold mb-2">권리 행사 방법:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있습니다</li>
                    <li>회사는 정보주체의 요구에 대해 지체없이 조치하겠습니다</li>
                    <li>만 14세 미만 아동의 경우, 법정대리인이 그 아동을 대리하여 권리를 행사할 수 있습니다</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. 개인정보의 파기</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold mb-2">파기절차</h3>
                    <p className="text-sm">이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">파기방법</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>전자적 파일 형태: 기록을 재생할 수 없도록 로우레벨포멧(Low Level Format) 등의 방법을 이용하여 파기</li>
                      <li>종이 문서: 분쇄기로 분쇄하거나 소각하여 파기</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. 개인정보 보호책임자</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">개인정보 보호책임자</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p><strong>성명:</strong> 김메리</p>
                      <p><strong>직책:</strong> 대표이사</p>
                      <p><strong>연락처:</strong> 1588-0000</p>
                    </div>
                    <div>
                      <p><strong>이메일:</strong> privacy@mereal.co.kr</p>
                      <p><strong>부서:</strong> 경영지원팀</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. 개인정보 처리방침 변경</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">공지 방법:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>웹사이트 메인페이지 공지사항</li>
                    <li>등록된 이메일로 개별 통지</li>
                    <li>서비스 이용 시 팝업 알림</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. 개인정보의 안전성 확보조치</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.</p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>개인정보 취급 직원의 최소화 및 교육:</strong> 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.</li>
                  <li><strong>정기적인 자체 감사:</strong> 개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.</li>
                  <li><strong>개인정보의 암호화:</strong> 이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.</li>
                  <li><strong>해킹 등에 대비한 기술적 대책:</strong> 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.</li>
                  <li><strong>개인정보에 대한 접근 제한:</strong> 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. 권익침해 구제방법</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">정보주체는 아래의 기관에 대해 개인정보 침해에 대한 신고나 상담을 하실 수 있습니다.</p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">개인정보보호위원회 개인정보보호 종합지원 포털</h3>
                    <ul className="text-sm space-y-1">
                      <li>웹사이트: privacy.go.kr</li>
                      <li>전화: 국번없이 182</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">개인정보 침해신고센터</h3>
                    <ul className="text-sm space-y-1">
                      <li>웹사이트: privacy.go.kr</li>
                      <li>전화: 국번없이 182</li>
                      <li>주소: (03171) 서울특별시 종로구 세종대로 209 정부서울청사 4층</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">대검찰청 사이버범죄수사단</h3>
                    <ul className="text-sm space-y-1">
                      <li>웹사이트: www.spo.go.kr</li>
                      <li>전화: 국번없이 1301</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">경찰청 사이버테러대응센터</h3>
                    <ul className="text-sm space-y-1">
                      <li>웹사이트: www.netan.go.kr</li>
                      <li>전화: 국번없이 182</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">부칙</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>이 개인정보처리방침은 2024년 1월 1일부터 시행됩니다.</p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                개인정보 관련 문의사항이 있으시면 <a href="mailto:privacy@mereal.co.kr" className="text-primary-600 hover:text-primary-700">privacy@mereal.co.kr</a>로 연락주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
