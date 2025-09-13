'use client'

import Header from '@/components/Header'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">이용약관</h1>
            <p className="text-gray-600">메리얼 서비스 이용에 관한 약관입니다.</p>
            <p className="text-sm text-gray-500 mt-2">최종 업데이트: 2024년 1월 1일</p>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제1조 (목적)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                이 약관은 ㈜메리얼(이하 "회사")이 제공하는 메리얼 서비스(이하 "서비스")의 이용과 관련하여 
                회사와 이용자간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제2조 (정의)</h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-2">이 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>"서비스"란 회사가 제공하는 온라인 맞춤형 인쇄 서비스를 의미합니다.</li>
                  <li>"이용자"란 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                  <li>"회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                  <li>"비회원"이란 회원에 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
                  <li>"인쇄물"이란 이용자가 제공한 디자인 파일을 기반으로 회사가 제작하는 모든 형태의 출력물을 말합니다.</li>
                </ol>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.</p>
                <p>2. 회사는 합리적인 사유가 발생할 경우에는 이 약관을 변경할 수 있으며, 약관을 변경할 때에는 적용일자 및 변경사유를 명시하여 현행약관과 함께 서비스의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.</p>
                <p>3. 이용자가 변경된 약관에 동의하지 않을 경우, 이용자는 서비스 이용을 중단하고 이용계약을 해지할 수 있습니다.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제4조 (서비스의 제공)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 회사가 제공하는 서비스는 다음과 같습니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>온라인 파일 업로드 및 인쇄 주문 서비스</li>
                  <li>다양한 사이즈 및 용지 옵션 제공</li>
                  <li>온라인 결제 서비스</li>
                  <li>주문 진행 상황 조회 서비스</li>
                  <li>고객 지원 서비스</li>
                </ul>
                <p>2. 회사는 서비스의 품질 향상을 위해 서비스의 내용을 수정하거나 변경할 수 있습니다.</p>
                <p>3. 회사는 다음과 같은 경우 서비스 제공을 중단할 수 있습니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>설비의 보수점검, 교체 및 고장, 통신의 두절 등의 경우</li>
                  <li>정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우</li>
                  <li>기타 불가항력적 사유가 있는 경우</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제5조 (회원가입)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.</p>
                <p>2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>가입신청자가 이전에 회원자격을 상실한 적이 있는 경우</li>
                  <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                  <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                  <li>기타 회원으로 등록하는 것이 회사의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제6조 (주문 및 결제)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 이용자는 서비스 상에서 다음과 같은 방법으로 주문을 합니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>인쇄할 파일의 업로드</li>
                  <li>사이즈, 용지, 수량 등 옵션 선택</li>
                  <li>결제정보의 입력 및 결제방법의 선택</li>
                  <li>약관 동의 및 주문 확정</li>
                </ul>
                <p>2. 회사는 이용자의 주문에 대해 다음 각 호에 해당하면 승낙하지 않을 수 있습니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>신청 내용에 허위, 기재누락, 오기가 있는 경우</li>
                  <li>기타 이용자의 귀책사유로 승낙이 곤란한 경우</li>
                </ul>
                <p>3. 결제는 토스페이먼츠를 통해 처리되며, 결제 완료 후 제작이 시작됩니다.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제7조 (취소 및 환불)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 이용자는 제작 시작 전까지 주문을 취소할 수 있으며, 이 경우 결제금액의 100%를 환불받을 수 있습니다.</p>
                <p>2. 제작이 시작된 후에는 다음과 같이 처리됩니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>제작 진행률에 따라 부분 환불 가능</li>
                  <li>완성된 제품의 경우 품질 문제가 있을 때만 환불 가능</li>
                </ul>
                <p>3. 환불은 결제한 방법과 동일한 방법으로 처리되며, 영업일 기준 3-5일이 소요됩니다.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제8조 (개인정보보호)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 회사는 이용자의 개인정보를 보호하기 위해 관련 법령에 따라 개인정보처리방침을 수립하고 이를 준수합니다.</p>
                <p>2. 개인정보의 수집, 이용, 제공, 위탁, 파기 등에 관한 자세한 사항은 개인정보처리방침에서 정합니다.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제9조 (회사의 의무)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 회사는 관련법과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다합니다.</p>
                <p>2. 회사는 이용자가 안전하게 서비스를 이용할 수 있도록 개인정보보호를 위한 보안시스템을 구축합니다.</p>
                <p>3. 회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 인정할 경우에는 이를 처리하여야 합니다.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제10조 (이용자의 의무)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 이용자는 다음 행위를 하여서는 안 됩니다:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>신청 또는 변경시 허위내용의 등록</li>
                  <li>타인의 정보 도용</li>
                  <li>회사가 게시한 정보의 변경</li>
                  <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                  <li>회사 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                  <li>회사 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                  <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                </ul>
                <p>2. 이용자는 관계법령, 이 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 합니다.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제11조 (저작권의 귀속)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</p>
                <p>2. 이용자는 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</p>
                <p>3. 이용자가 업로드한 파일의 저작권은 이용자에게 있으며, 회사는 주문 처리 목적으로만 사용합니다.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">제12조 (분쟁해결)</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>1. 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</p>
                <p>2. 회사와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거주지를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거주지가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.</p>
                <p>3. 회사와 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">부칙</h2>
              <div className="text-gray-700 leading-relaxed">
                <p>이 약관은 2024년 1월 1일부터 시행합니다.</p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                문의사항이 있으시면 <a href="mailto:support@mereal.co.kr" className="text-primary-600 hover:text-primary-700">support@mereal.co.kr</a>로 연락주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
