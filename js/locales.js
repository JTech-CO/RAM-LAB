/* Bilingual presentation catalog. Device state and user data are language-neutral. */
(()=>{
const R=window.RAM;
R.localeEntries=[
 [
  "되먹임으로 기억하는 회로.",
  "되먹임으로 기억하는 회로.",
  "A circuit that remembers through feedback."
 ],
 [
  "래치 · 6T",
  "래치 · 6T",
  "Latch · 6T"
 ],
 [
  "논리 전압의 안정 상태",
  "논리 전압의 안정 상태",
  "Two stable logic states"
 ],
 [
  "두 인버터가 서로를 구동하며 Q와 Q̅을 반대 상태로 유지합니다. 6개 트랜지스터 중 4개는 기억을, 2개는 접근을 담당합니다.",
  "두 인버터가 서로를 구동하며 Q와 Q̅을 반대 상태로 유지합니다. 6개 트랜지스터 중 4개는 기억을, 2개는 접근을 담당합니다.",
  "Two inverters drive each other, keeping Q and Q̅ complementary. Four transistors hold the bit and two control access."
 ],
 [
  "인버터의 입력과 출력을 교차 연결한 두 안정 상태. 6T는 대표 셀이며 모든 SRAM 구현이 6T인 것은 아닙니다.",
  "인버터의 입력과 출력을 교차 연결한 두 안정 상태. 6T는 대표 셀이며 모든 SRAM 구현이 6T인 것은 아닙니다.",
  "Cross-coupling two inverters creates two stable states. 6T is a representative bit cell, not the only SRAM implementation."
 ],
 [
  "캐시라인·명령·레지스터 파일의 데이터도 결국 0/1의 논리 상태로 저장됩니다. 셀은 데이터가 숫자인지 문자열인지 알지 못합니다.",
  "캐시라인·명령·레지스터 파일의 데이터도 결국 0/1의 논리 상태로 저장됩니다. 셀은 데이터가 숫자인지 문자열인지 알지 못합니다.",
  "Cache lines, instructions and register-file data are stored as binary logic states. A cell does not know whether its bits represent a number or a string."
 ],
 [
  "대표적인 평면 MOS 단면과 6T 연결을 보여줍니다. 실제 FinFET·GAA SRAM의 파운드리 레이아웃, 소자 크기, 잡음 마진 및 동적 전력은 재현하지 않습니다.",
  "대표적인 평면 MOS 단면과 6T 연결을 보여줍니다. 실제 FinFET·GAA SRAM의 파운드리 레이아웃, 소자 크기, 잡음 마진 및 동적 전력은 재현하지 않습니다.",
  "This model shows representative planar MOS sections and 6T connections. It does not reproduce foundry layouts, FinFET or GAA dimensions, noise margins or dynamic power."
 ],
 [
  "저장된 전하가 데이터가 되는 순간.",
  "저장된 전하가 데이터가 되는 순간.",
  "Stored charge becomes readable data."
 ],
 [
  "커패시터 · 1T1C",
  "커패시터 · 1T1C",
  "Capacitor · 1T1C"
 ],
 [
  "커패시터의 저장 전압",
  "커패시터의 저장 전압",
  "Voltage on a storage capacitor"
 ],
 [
  "트랜지스터가 문을 열면 커패시터의 전하가 비트라인과 나뉩니다. 작은 차이를 증폭하고 원래 전압으로 복원하는 과정이 읽기입니다.",
  "트랜지스터가 문을 열면 커패시터의 전하가 비트라인과 나뉩니다. 작은 차이를 증폭하고 원래 전압으로 복원하는 과정이 읽기입니다.",
  "Opening the access transistor shares the capacitor charge with the bit line. Reading amplifies the small difference and restores the original voltage."
 ],
 [
  "이 실험은 VDD=1 V, Cc:Cb=1:10을 가정합니다. 실제 제품값이 아니라 전하 보존을 보여주기 위한 예시이며, 접속된 플레이트는 VDD/2로 유지됩니다.",
  "이 실험은 VDD=1 V, Cc:Cb=1:10을 가정합니다. 실제 제품값이 아니라 전하 보존을 보여주기 위한 예시이며, 접속된 플레이트는 VDD/2로 유지됩니다.",
  "This experiment assumes VDD = 1 V and Cc:Cb = 1:10. These are teaching values, not product specifications. The common plate is held at VDD/2."
 ],
 [
  "메인 메모리는 CPU가 사용하는 프로그램 코드와 작업 데이터를 보관합니다. 주소를 행과 열로 나누어 행을 연 뒤, 센스 앰프의 행 버퍼에서 필요한 부분을 꺼냅니다.",
  "메인 메모리는 CPU가 사용하는 프로그램 코드와 작업 데이터를 보관합니다. 주소를 행과 열로 나누어 행을 연 뒤, 센스 앰프의 행 버퍼에서 필요한 부분을 꺼냅니다.",
  "Main memory holds program code and working data used by the CPU. Row and column addresses select an array location; after a row is activated, the column path selects data from its sense-amplifier row buffer."
 ],
 [
  "그림의 커패시터 크기와 주변 셀 간격은 비례하지 않습니다. 감지와 복원은 실제로 겹쳐 일어나지만 단계별 학습을 위해 분리했습니다. 누설 모델은 실측 분포가 아닌 예시입니다.",
  "그림의 커패시터 크기와 주변 셀 간격은 비례하지 않습니다. 감지와 복원은 실제로 겹쳐 일어나지만 단계별 학습을 위해 분리했습니다. 누설 모델은 실측 분포가 아닌 예시입니다.",
  "Capacitor dimensions and cell spacing are not to scale. Sensing and restoration overlap in real hardware but are separated here for learning. Leakage is an illustrative model, not a measured distribution."
 ],
 [
  "더 빠른 셀보다, 더 넓은 데이터 길.",
  "더 빠른 셀보다, 더 넓은 데이터 길.",
  "A wider data path, not a different bit cell."
 ],
 [
  "DRAM 적층 · TSV",
  "DRAM 적층 · TSV",
  "DRAM stack · TSV"
 ],
 [
  "DRAM 저장 + 병렬 인터페이스",
  "DRAM 저장 + 병렬 인터페이스",
  "DRAM cells + parallel interfaces"
 ],
 [
  "동일한 1T1C 저장 원리를 쓰는 DRAM 다이를 수직으로 쌓습니다. TSV와 인터포저가 많은 데이터 경로를 가속기 가까이 연결합니다.",
  "동일한 1T1C 저장 원리를 쓰는 DRAM 다이를 수직으로 쌓습니다. TSV와 인터포저가 많은 데이터 경로를 가속기 가까이 연결합니다.",
  "DRAM dies using the same 1T1C principle are stacked vertically. TSVs and an interposer connect many data paths close to the accelerator."
 ],
 [
  "예시: 1,024 bit × 6.4 Gbit/s/pin ÷ 8 = 819.2 GB/s. 산술 예제이며 현재 화면의 8개 대표 경로나 특정 제품의 실효 성능을 뜻하지 않습니다.",
  "예시: 1,024 bit × 6.4 Gbit/s/pin ÷ 8 = 819.2 GB/s. 산술 예제이며 현재 화면의 8개 대표 경로나 특정 제품의 실효 성능을 뜻하지 않습니다.",
  "Example: 1,024 bit × 6.4 Gbit/s/pin ÷ 8 = 819.2 GB/s. This is arithmetic, not the bandwidth of the eight displayed paths or the effective performance of a product."
 ],
 [
  "가속기 연산에 필요한 텐서·활성값·KV 캐시 등도 비트 배열입니다. 높은 병렬 대역폭은 많은 데이터를 연속 공급하는 데 유리하지만, 한 셀의 접근 지연이 그 비율만큼 줄어드는 것은 아닙니다.",
  "가속기 연산에 필요한 텐서·활성값·KV 캐시 등도 비트 배열입니다. 높은 병렬 대역폭은 많은 데이터를 연속 공급하는 데 유리하지만, 한 셀의 접근 지연이 그 비율만큼 줄어드는 것은 아닙니다.",
  "Tensors, activations and KV-cache data are also arrays of bits. High parallel bandwidth helps supply large data streams; it does not reduce the access latency of one cell by the same factor."
 ],
 [
  "8단 스택과 8개 경로는 구조 설명용입니다. 채널은 다이와 1:1 대응하지 않으며, 이 화면의 뱅크·레이어 선택은 서로 다른 탐색 축입니다. 열·전력·JEDEC 명령 타이밍은 계산하지 않습니다.",
  "8단 스택과 8개 경로는 구조 설명용입니다. 채널은 다이와 1:1 대응하지 않으며, 이 화면의 뱅크·레이어 선택은 서로 다른 탐색 축입니다. 열·전력·JEDEC 명령 타이밍은 계산하지 않습니다.",
  "The eight dies and eight paths illustrate structure. Channels and dies do not have a one-to-one relationship. Bank selection and observed layer are separate controls. Thermal behavior, power and JEDEC command timing are not calculated."
 ],
 [
  "플래시의 용량을, 병렬 경로로.",
  "플래시의 용량을, 병렬 경로로.",
  "Flash capacity, connected in parallel."
 ],
 [
  "NAND 기반 · 병렬 I/O",
  "NAND 기반 · 병렬 I/O",
  "NAND · parallel I/O"
 ],
 [
  "NAND 저장 + 높은 병렬성",
  "NAND 저장 + 높은 병렬성",
  "NAND storage + parallel access"
 ],
 [
  "셀에서는 NAND처럼 전하를 가두고 문턱 전압으로 읽습니다. 독립적인 배열 접근과 가속기 인접 데이터 경로가 대역폭을 확대합니다.",
  "셀에서는 NAND처럼 전하를 가두고 문턱 전압으로 읽습니다. 독립적인 배열 접근과 가속기 인접 데이터 경로가 대역폭을 확대합니다.",
  "Cells trap charge and are read through threshold sensing, as in NAND. Independent array access and near-accelerator data paths increase aggregate bandwidth."
 ],
 [
  "서브어레이의 동시 접근과 인터페이스 폭은 대역폭을 높이지만, 개별 NAND 센싱의 지연을 없애지 않습니다. 이 앱은 HBF의 제품별 지연·내구성 값을 추정하지 않습니다.",
  "서브어레이의 동시 접근과 인터페이스 폭은 대역폭을 높이지만, 개별 NAND 센싱의 지연을 없애지 않습니다. 이 앱은 HBF의 제품별 지연·내구성 값을 추정하지 않습니다.",
  "Concurrent subarray access and a wide interface increase throughput but do not remove the sensing latency of an individual NAND access. This app does not estimate product-specific HBF latency or endurance."
 ],
 [
  "대규모 추론의 모델 가중치처럼 용량과 읽기 대역폭을 함께 요구하는 데이터가 대표적인 활용 대상으로 제시됩니다. 실제 요청 입도·큐·매핑·보존 관리 정책은 구현 및 사양에 의존합니다.",
  "대규모 추론의 모델 가중치처럼 용량과 읽기 대역폭을 함께 요구하는 데이터가 대표적인 활용 대상으로 제시됩니다. 실제 요청 입도·큐·매핑·보존 관리 정책은 구현 및 사양에 의존합니다.",
  "Model weights for large-scale inference are an example of data requiring both capacity and read bandwidth. Request granularity, queues, mapping and retention management depend on the implementation and specification."
 ],
 [
  "2026-09-10 확인한 공개 자료를 토대로 한 개념 시각화입니다. 모든 HBF가 SSD처럼 장기간 무관리 보존을 보장하는 것은 아닙니다. 본 화면의 물리 페이지·블록 실험을 호스트 API와 동일시하지 마세요.",
  "2026-09-10 확인한 공개 자료를 토대로 한 개념 시각화입니다. 모든 HBF가 SSD처럼 장기간 무관리 보존을 보장하는 것은 아닙니다. 본 화면의 물리 페이지·블록 실험을 호스트 API와 동일시하지 마세요.",
  "This is a conceptual visualization based on the public material reviewed for the original app on 2026-09-10. Not all HBF implementations guarantee long, unmanaged SSD-like retention. Do not equate this physical page/block experiment with a host API."
 ],
 [
  "전하를 가두고, 문턱을 읽다.",
  "전하를 가두고, 문턱을 읽다.",
  "Trap charge. Sense a threshold."
 ],
 [
  "전하 트랩 · 3D 스트링",
  "전하 트랩 · 3D 스트링",
  "Charge trap · 3D string"
 ],
 [
  "저장 전하가 바꾸는 문턱 전압",
  "저장 전하가 바꾸는 문턱 전압",
  "Stored charge shifts the threshold"
 ],
 [
  "절연층 안에 포획된 전하가 트랜지스터의 문턱 전압을 바꿉니다. 수직으로 연결한 셀 스트링에서 선택한 셀의 도통 여부를 읽습니다.",
  "절연층 안에 포획된 전하가 트랜지스터의 문턱 전압을 바꿉니다. 수직으로 연결한 셀 스트링에서 선택한 셀의 도통 여부를 읽습니다.",
  "Charge trapped in an insulating layer changes a transistor threshold. A vertical string is read by sensing whether the selected cell conducts."
 ],
 [
  "TLC는 8개 상태로 3비트를 표현합니다. 앱의 Gray 코드 매핑과 정규화 Vt 분포는 예시입니다. 실제 업체의 매핑, 분포 폭, 읽기 순서는 다를 수 있습니다.",
  "TLC는 8개 상태로 3비트를 표현합니다. 앱의 Gray 코드 매핑과 정규화 Vt 분포는 예시입니다. 실제 업체의 매핑, 분포 폭, 읽기 순서는 다를 수 있습니다.",
  "TLC uses eight distinguishable states to represent three bits. The Gray mapping and normalized Vt distributions here are examples. Vendor mappings, distribution widths and read sequences can differ."
 ],
 [
  "소프트웨어는 파일이나 논리 블록을 보지만, NAND 셀은 문턱 상태만 보관합니다. 일반 SSD의 컨트롤러는 논리 주소를 물리 페이지에 매핑하며 ECC·마모 분산·가비지 컬렉션을 관리합니다.",
  "소프트웨어는 파일이나 논리 블록을 보지만, NAND 셀은 문턱 상태만 보관합니다. 일반 SSD의 컨트롤러는 논리 주소를 물리 페이지에 매핑하며 ECC·마모 분산·가비지 컬렉션을 관리합니다.",
  "Software sees files and logical blocks, while NAND cells store threshold states. In a typical SSD, a controller maps logical addresses to physical pages and handles ECC, wear leveling and garbage collection."
 ],
 [
  "CTF 기반 3D NAND의 대표 구조입니다. 모든 NAND가 CTF는 아니며, 그림의 8개 WL과 8개 셀 표본은 실제 층수나 페이지 크기가 아닙니다. MLC 이상에서 한 WL의 셀 상태는 여러 논리 페이지에 걸친 정보를 표현하며, 이 앱은 이를 한 번에 프로그램하는 추상 모델입니다. 이 앱은 FTL·실제 ECC·ISPP 전압 파형을 에뮬레이션하지 않습니다.",
  "CTF 기반 3D NAND의 대표 구조입니다. 모든 NAND가 CTF는 아니며, 그림의 8개 WL과 8개 셀 표본은 실제 층수나 페이지 크기가 아닙니다. MLC 이상에서 한 WL의 셀 상태는 여러 논리 페이지에 걸친 정보를 표현하며, 이 앱은 이를 한 번에 프로그램하는 추상 모델입니다. 이 앱은 FTL·실제 ECC·ISPP 전압 파형을 에뮬레이션하지 않습니다.",
  "This is a representative charge-trap 3D NAND structure; not all NAND uses charge trapping. Eight word lines and eight sampled cells are not actual layer counts or page dimensions. With multiple bits per cell, one word line holds information from several logical pages. This app programs their combined states in one abstract operation and does not emulate an FTL, actual ECC or ISPP voltage waveforms."
 ],
 [
  "저장 매체",
  "저장 매체",
  "Storage medium"
 ],
 [
  "저장 단위",
  "저장 단위",
  "Per bit"
 ],
 [
  "읽기 특성",
  "읽기 특성",
  "Read behavior"
 ],
 [
  "상태 유지",
  "상태 유지",
  "Retention"
 ],
 [
  "교차 결합 인버터",
  "교차 결합 인버터",
  "Cross-coupled inverters"
 ],
 [
  "비파괴적 · 차동 센싱",
  "비파괴적 · 차동 센싱",
  "Non-destructive · differential"
 ],
 [
  "전원 필요 · 리프레시 없음",
  "전원 필요 · 리프레시 없음",
  "Power, no refresh"
 ],
 [
  "커패시터 + 접근 MOS",
  "커패시터 + 접근 MOS",
  "Capacitor + access MOS"
 ],
 [
  "전하 공유 · 감지 · 복원",
  "전하 공유 · 감지 · 복원",
  "Share · sense · restore"
 ],
 [
  "주기적인 리프레시 필요",
  "주기적인 리프레시 필요",
  "Periodic refresh"
 ],
 [
  "DRAM의 1T1C 셀",
  "DRAM의 1T1C 셀",
  "DRAM 1T1C cells"
 ],
 [
  "배열 구조",
  "배열 구조",
  "Organization"
 ],
 [
  "여러 다이 · 여러 뱅크",
  "여러 다이 · 여러 뱅크",
  "Multiple dies and banks"
 ],
 [
  "주요 이점",
  "주요 이점",
  "Main advantage"
 ],
 [
  "넓은 병렬 전송 경로",
  "넓은 병렬 전송 경로",
  "Wide parallel data paths"
 ],
 [
  "DRAM처럼 복원·리프레시",
  "DRAM처럼 복원·리프레시",
  "Restore and refresh"
 ],
 [
  "NAND의 전하 저장층",
  "NAND의 전하 저장층",
  "NAND charge storage"
 ],
 [
  "데이터 특성",
  "데이터 특성",
  "Data characteristics"
 ],
 [
  "비휘발성 · 읽기 중심",
  "비휘발성 · 읽기 중심",
  "Non-volatile · read-oriented"
 ],
 [
  "쓰기를 바꾸는 제약",
  "쓰기를 바꾸는 제약",
  "Write constraint"
 ],
 [
  "프로그램 / 블록 소거",
  "프로그램 / 블록 소거",
  "Program / block erase"
 ],
 [
  "구현 범위",
  "구현 범위",
  "Model scope"
 ],
 [
  "공개 구조 기반 개념 모델",
  "공개 구조 기반 개념 모델",
  "Public-architecture concept"
 ],
 [
  "전하 트랩층 · CTF 예시",
  "전하 트랩층 · CTF 예시",
  "Charge trap · CTF example"
 ],
 [
  "셀당 정보량",
  "셀당 정보량",
  "Bits per cell"
 ],
 [
  "읽기·쓰기",
  "읽기·쓰기",
  "Read / write"
 ],
 [
  "페이지 단위의 센싱·프로그램",
  "페이지 단위의 센싱·프로그램",
  "Page sensing / program"
 ],
 [
  "소거 단위",
  "소거 단위",
  "Erase unit"
 ],
 [
  "여러 페이지를 포함한 블록",
  "여러 페이지를 포함한 블록",
  "A block of pages"
 ],
 [
  "실리콘 기판",
  "실리콘 기판",
  "Silicon substrate"
 ],
 [
  "접근 트랜지스터와 주변회로를 지지하는 반도체 영역입니다. 색상은 물질 구분용이며 실제 현미경 색상이 아닙니다.",
  "접근 트랜지스터와 주변회로를 지지하는 반도체 영역입니다. 색상은 물질 구분용이며 실제 현미경 색상이 아닙니다.",
  "The semiconductor region supporting access transistors and peripheral circuits. Colors distinguish materials; they are not microscope colors."
 ],
 [
  "워드라인",
  "워드라인",
  "Word line / gate control"
 ],
 [
  "행을 선택하는 제어선입니다. WL을 통해 데이터 자체가 저장되는 것이 아니라, 게이트 전압이 셀의 접근을 제어합니다.",
  "행을 선택하는 제어선입니다. WL을 통해 데이터 자체가 저장되는 것이 아니라, 게이트 전압이 셀의 접근을 제어합니다.",
  "A control line that selects a row. It carries a gate bias to control access, not the stored data itself."
 ],
 [
  "비트라인",
  "비트라인",
  "Bit line / data path"
 ],
 [
  "선택 셀의 전기적 상태를 센싱 회로로 전달하고, 쓰기 구동을 셀에 전달하는 경로입니다.",
  "선택 셀의 전기적 상태를 센싱 회로로 전달하고, 쓰기 구동을 셀에 전달하는 경로입니다.",
  "Carries the selected cell state to sensing circuits and carries write drive back to the cell."
 ],
 [
  "센스 앰프",
  "센스 앰프",
  "Sense amplifier"
 ],
 [
  "미세한 전압차 또는 전류 차를 증폭해 디지털 논리로 판정하는 주변회로입니다. SRAM·DRAM·NAND에서 입력 물리량과 동작 방식이 다릅니다.",
  "미세한 전압차 또는 전류 차를 증폭해 디지털 논리로 판정하는 주변회로입니다. SRAM·DRAM·NAND에서 입력 물리량과 동작 방식이 다릅니다.",
  "Amplifies a small voltage or current difference into a digital decision. The physical input and operation differ between SRAM, DRAM and NAND."
 ],
 [
  "데이터 버퍼",
  "데이터 버퍼",
  "Row / page buffer"
 ],
 [
  "센싱 결과를 잠시 유지하고 데이터 인터페이스와 연결하는 회로입니다. DRAM 행 버퍼와 NAND 페이지 버퍼는 같은 소자는 아닙니다.",
  "센싱 결과를 잠시 유지하고 데이터 인터페이스와 연결하는 회로입니다. DRAM 행 버퍼와 NAND 페이지 버퍼는 같은 소자는 아닙니다.",
  "Temporarily holds sensing results and connects them to the data interface. A DRAM row buffer and a NAND page buffer are not the same device."
 ],
 [
  "두 CMOS 인버터의 출력이 상대편 입력으로 되돌아갑니다. 하나의 출력이 높으면 다른 출력은 낮아지는 양의 되먹임 구조입니다.",
  "두 CMOS 인버터의 출력이 상대편 입력으로 되돌아갑니다. 하나의 출력이 높으면 다른 출력은 낮아지는 양의 되먹임 구조입니다.",
  "The output of each CMOS inverter feeds the input of the other. A high output on one side sustains a low output on the other through positive feedback."
 ],
 [
  "저장 노드 Q",
  "저장 노드 Q",
  "Storage node"
 ],
 [
  "사용자가 읽는 0 또는 1에 대응하는 논리 전압입니다. 반대편 Q̅과 항상 상보 상태를 이루는 정상 동작을 모델링합니다.",
  "사용자가 읽는 0 또는 1에 대응하는 논리 전압입니다. 반대편 Q̅과 항상 상보 상태를 이루는 정상 동작을 모델링합니다.",
  "The logic voltage corresponding to the stored zero or one. Normal operation is modeled with Q and Q̅ complementary."
 ],
 [
  "상보 저장 노드 Q̅",
  "상보 저장 노드 Q̅",
  "Complementary storage node"
 ],
 [
  "Q가 1일 때 Q̅은 0입니다. 6T SRAM의 두 노드는 2비트가 아니라 한 비트의 상보 표현입니다.",
  "Q가 1일 때 Q̅은 0입니다. 6T SRAM의 두 노드는 2비트가 아니라 한 비트의 상보 표현입니다.",
  "When Q is 1, Q̅ is 0. These are complementary representations of one bit, not two independent bits."
 ],
 [
  "액세스 트랜지스터 2개",
  "액세스 트랜지스터 2개",
  "Access / pass-gate NMOS"
 ],
 [
  "같은 WL에 제어되는 두 NMOS가 Q-BL, Q̅-BL̅ 경로를 동시에 연결합니다. 나머지 4개 트랜지스터는 래치입니다.",
  "같은 WL에 제어되는 두 NMOS가 Q-BL, Q̅-BL̅ 경로를 동시에 연결합니다. 나머지 4개 트랜지스터는 래치입니다.",
  "Two NMOS devices controlled by the same word line connect Q to BL and Q̅ to BL̅. The other four transistors form the latch."
 ],
 [
  "상보 비트라인 BL̅",
  "상보 비트라인 BL̅",
  "Complementary bit line"
 ],
 [
  "BL과 한 쌍으로 사용됩니다. 읽기는 작은 차이를 판정하고, 쓰기는 두 선을 서로 반대 전압으로 강하게 구동합니다.",
  "BL과 한 쌍으로 사용됩니다. 읽기는 작은 차이를 판정하고, 쓰기는 두 선을 서로 반대 전압으로 강하게 구동합니다.",
  "Used together with BL. A read senses their small difference; a write strongly drives the two lines to opposite levels."
 ],
 [
  "공통 플레이트",
  "공통 플레이트",
  "Common plate"
 ],
 [
  "커패시터의 반대쪽 전극입니다. 이 예시에서는 VDD/2에 고정합니다. 저장 전하의 부호와 양은 저장 노드와 플레이트 사이 전압차에 따라 달라집니다.",
  "커패시터의 반대쪽 전극입니다. 이 예시에서는 VDD/2에 고정합니다. 저장 전하의 부호와 양은 저장 노드와 플레이트 사이 전압차에 따라 달라집니다.",
  "The opposite electrode of the capacitor, held at VDD/2 in this example. The sign and amount of charge depend on the voltage difference between this plate and the storage node."
 ],
 [
  "고유전율 절연막",
  "고유전율 절연막",
  "High-k dielectric"
 ],
 [
  "두 전극이 직접 도통하지 않도록 분리하면서 전기장을 형성합니다. 얇고 높은 커패시턴스를 얻는 구조를 보여주지만 치수·재료 조성은 제품 모델이 아닙니다.",
  "두 전극이 직접 도통하지 않도록 분리하면서 전기장을 형성합니다. 얇고 높은 커패시턴스를 얻는 구조를 보여주지만 치수·재료 조성은 제품 모델이 아닙니다.",
  "Separates the electrodes while supporting an electric field. The model illustrates capacitance but does not specify a product dielectric composition or dimension."
 ],
 [
  "저장 전극 / 저장 노드",
  "저장 전극 / 저장 노드",
  "Storage electrode / node"
 ],
 [
  "접근 MOS와 연결된 커패시터 전극입니다. 읽기 중 비트라인과 전하를 공유한 뒤 센스 앰프로 원래 전압을 복원합니다.",
  "접근 MOS와 연결된 커패시터 전극입니다. 읽기 중 비트라인과 전하를 공유한 뒤 센스 앰프로 원래 전압을 복원합니다.",
  "The capacitor electrode connected to the access MOS. It shares charge with the bit line during a read, then the sense amplifier restores its original voltage."
 ],
 [
  "접근 트랜지스터",
  "접근 트랜지스터",
  "Access MOSFET"
 ],
 [
  "게이트가 WL에 연결되어 있습니다. 켜지면 저장 노드와 BL을 연결하고, 꺼지면 전하를 가두지만 완전한 무누설 스위치는 아닙니다.",
  "게이트가 WL에 연결되어 있습니다. 켜지면 저장 노드와 BL을 연결하고, 꺼지면 전하를 가두지만 완전한 무누설 스위치는 아닙니다.",
  "Its gate is connected to WL. Turning it on connects the storage node to BL. Turning it off isolates charge, but a real transistor is not a perfectly leak-free switch."
 ],
 [
  "주변 1T1C 셀",
  "주변 1T1C 셀",
  "Neighboring cells"
 ],
 [
  "한 비트씩 저장하는 주변 셀의 축약 구조입니다. 선택 셀은 절연막과 전극을 보기 위해 더 크게 표현했습니다.",
  "한 비트씩 저장하는 주변 셀의 축약 구조입니다. 선택 셀은 절연막과 전극을 보기 위해 더 크게 표현했습니다.",
  "Simplified neighboring one-bit cells. The selected cell is enlarged to reveal its dielectric and electrodes."
 ],
 [
  "저장 노드 컨택",
  "저장 노드 컨택",
  "Storage-node contact"
 ],
 [
  "접근 트랜지스터의 확산 영역과 저장 커패시터 전극을 전기적으로 연결합니다.",
  "접근 트랜지스터의 확산 영역과 저장 커패시터 전극을 전기적으로 연결합니다.",
  "Electrically connects the access transistor diffusion region to the storage capacitor electrode."
 ],
 [
  "가속기",
  "가속기",
  "Processor / accelerator"
 ],
 [
  "메모리 데이터를 받아 연산하는 별도 로직 다이입니다. 본 시각화에서 HBM 다이 자체가 텐서 연산을 수행하는 것으로 표현하지 않았습니다.",
  "메모리 데이터를 받아 연산하는 별도 로직 다이입니다. 본 시각화에서 HBM 다이 자체가 텐서 연산을 수행하는 것으로 표현하지 않았습니다.",
  "A separate logic die that receives memory data for computation. The displayed HBM dies are not depicted as performing tensor computations."
 ],
 [
  "적층 DRAM 다이",
  "적층 DRAM 다이",
  "Stacked DRAM dies"
 ],
 [
  "각 다이에 뱅크와 1T1C 셀 배열이 있습니다. 다이 수와 채널 수는 동일한 개념이 아니며 서로 1:1로 연결되지 않습니다.",
  "각 다이에 뱅크와 1T1C 셀 배열이 있습니다. 다이 수와 채널 수는 동일한 개념이 아니며 서로 1:1로 연결되지 않습니다.",
  "Each die contains banks and 1T1C arrays. Die count and channel count are different concepts and do not map one-to-one."
 ],
 [
  "뱅크와 배열",
  "뱅크와 배열",
  "Banks / memory arrays"
 ],
 [
  "행을 여는 단위와 병렬 접근 자원을 제공합니다. 화면의 타일은 구조를 설명하는 대표 블록이며 실제 주소 비트 배치가 아닙니다.",
  "행을 여는 단위와 병렬 접근 자원을 제공합니다. 화면의 타일은 구조를 설명하는 대표 블록이며 실제 주소 비트 배치가 아닙니다.",
  "Provides row-activation domains and parallel access resources. Tiles are representative blocks, not an exact physical address-bit layout."
 ],
 [
  "실리콘 관통 전극",
  "실리콘 관통 전극",
  "Through-silicon via"
 ],
 [
  "다이를 관통하는 전기 연결입니다. 신호·전원·접지용 TSV가 존재하며, 모든 TSV가 독립 데이터 핀인 것은 아닙니다.",
  "다이를 관통하는 전기 연결입니다. 신호·전원·접지용 TSV가 존재하며, 모든 TSV가 독립 데이터 핀인 것은 아닙니다.",
  "An electrical connection through silicon. TSVs may carry signals, power or ground; not every TSV is an independent data pin."
 ],
 [
  "베이스 다이",
  "베이스 다이",
  "Base die / I/O logic"
 ],
 [
  "상부 메모리 다이와 외부 인터페이스 사이의 데이터 경로를 연결합니다. 로직 기능과 컨트롤러 분담은 세대 및 제품에 따라 달라집니다.",
  "상부 메모리 다이와 외부 인터페이스 사이의 데이터 경로를 연결합니다. 로직 기능과 컨트롤러 분담은 세대 및 제품에 따라 달라집니다.",
  "Connects the upper memory dies to the external interface. Logic functions and controller responsibilities depend on generation and product."
 ],
 [
  "인터포저",
  "인터포저",
  "Interposer / package wiring"
 ],
 [
  "가속기와 스택 사이의 많은 연결을 짧은 거리로 배치합니다. 넓은 데이터 경로는 대역폭을 높이지만 셀의 리프레시 필요성은 그대로입니다.",
  "가속기와 스택 사이의 많은 연결을 짧은 거리로 배치합니다. 넓은 데이터 경로는 대역폭을 높이지만 셀의 리프레시 필요성은 그대로입니다.",
  "Routes many short connections between accelerator and memory stack. Wide paths increase bandwidth without eliminating cell refresh."
 ],
 [
  "NAND 기반 대용량 데이터 계층을 활용하는 호스트입니다. 호스트의 실제 요청 형식과 캐싱 정책은 이 모델의 단순화된 데이터 경로와 다를 수 있습니다.",
  "NAND 기반 대용량 데이터 계층을 활용하는 호스트입니다. 호스트의 실제 요청 형식과 캐싱 정책은 이 모델의 단순화된 데이터 경로와 다를 수 있습니다.",
  "The host accessing a high-capacity, NAND-based data tier. Actual request formats and caching policy can differ from this simplified path."
 ],
 [
  "적층 NAND 다이",
  "적층 NAND 다이",
  "NAND die stack"
 ],
 [
  "다이 내부의 수직 NAND WL 적층과 여러 다이의 패키지 적층은 서로 다른 두 층위입니다. 이 장면은 패키지 적층을 보여줍니다.",
  "다이 내부의 수직 NAND WL 적층과 여러 다이의 패키지 적층은 서로 다른 두 층위입니다. 이 장면은 패키지 적층을 보여줍니다.",
  "Vertical word-line layers inside a NAND die and multiple dies stacked in a package are different levels of organization. This scene shows the package stack."
 ],
 [
  "병렬 서브어레이",
  "병렬 서브어레이",
  "Parallel subarrays"
 ],
 [
  "여러 NAND 센싱 작업을 겹쳐 수행하는 대표 구조입니다. 각 개별 읽기의 지연이 짧아진 것과 동시 처리량이 커진 것을 구분해야 합니다.",
  "여러 NAND 센싱 작업을 겹쳐 수행하는 대표 구조입니다. 각 개별 읽기의 지연이 짧아진 것과 동시 처리량이 커진 것을 구분해야 합니다.",
  "Represents overlapping NAND sensing operations. Increased concurrent throughput must not be confused with shorter latency for a single read."
 ],
 [
  "수직 연결",
  "수직 연결",
  "Vertical electrical connections"
 ],
 [
  "적층 다이의 데이터 경로를 제어 로직으로 연결하는 개념 표현입니다. 정확한 내부 토폴로지나 핀 배치를 재현하지 않습니다.",
  "적층 다이의 데이터 경로를 제어 로직으로 연결하는 개념 표현입니다. 정확한 내부 토폴로지나 핀 배치를 재현하지 않습니다.",
  "A conceptual connection from stacked dies to control logic, not a reproduction of a specific internal topology or pin assignment."
 ],
 [
  "버퍼와 제어 로직",
  "버퍼와 제어 로직",
  "Page buffers / controller path"
 ],
 [
  "센싱 결과를 모으고 오류 정정 및 데이터 이동을 조율하는 경로입니다. 페이지·블록 단위 제약이 호스트에 노출되는 방식은 구현에 따라 달라집니다.",
  "센싱 결과를 모으고 오류 정정 및 데이터 이동을 조율하는 경로입니다. 페이지·블록 단위 제약이 호스트에 노출되는 방식은 구현에 따라 달라집니다.",
  "Collects sensing results and coordinates data movement and error correction. How page and block constraints reach the host depends on the implementation."
 ],
 [
  "근접 데이터 연결",
  "근접 데이터 연결",
  "Near-accelerator interconnect"
 ],
 [
  "용량이 큰 NAND 계층을 가속기 가까이 배치해 데이터 공급을 개선하는 개념입니다. HBM과 동일 소켓에 그대로 꽂는 호환성을 뜻하지 않습니다.",
  "용량이 큰 NAND 계층을 가속기 가까이 배치해 데이터 공급을 개선하는 개념입니다. HBM과 동일 소켓에 그대로 꽂는 호환성을 뜻하지 않습니다.",
  "Represents placing a high-capacity NAND tier near an accelerator. It does not imply drop-in socket compatibility with HBM."
 ],
 [
  "배열과 CMOS 로직",
  "배열과 CMOS 로직",
  "Array / CMOS separation"
 ],
 [
  "NAND 배열과 주변 CMOS 로직을 결합하는 구조적 구분을 표시합니다. CBA 본딩 자체가 모든 병렬화 알고리즘을 자동으로 제공하는 것은 아닙니다.",
  "NAND 배열과 주변 CMOS 로직을 결합하는 구조적 구분을 표시합니다. CBA 본딩 자체가 모든 병렬화 알고리즘을 자동으로 제공하는 것은 아닙니다.",
  "Distinguishes NAND arrays from their peripheral CMOS. Bonding the array to CMOS does not by itself provide every parallelization mechanism."
 ],
 [
  "선택 워드라인",
  "선택 워드라인",
  "Selected word line"
 ],
 [
  "같은 WL의 여러 스트링 셀을 함께 제어합니다. 선택 WL에는 읽기 기준, 비선택 WL에는 충분한 통과 바이어스를 걸어 선택 셀의 도통 여부를 구분합니다.",
  "같은 WL의 여러 스트링 셀을 함께 제어합니다. 선택 WL에는 읽기 기준, 비선택 WL에는 충분한 통과 바이어스를 걸어 선택 셀의 도통 여부를 구분합니다.",
  "Controls cells on the same word line across multiple strings. The selected WL gets a read reference; unselected WLs get a pass bias so the selected cell determines conduction."
 ],
 [
  "전하 트랩층",
  "전하 트랩층",
  "Charge-trapping dielectric"
 ],
 [
  "절연막 속의 트랩에 전하를 포획합니다. 트랩 전하가 주변 채널의 문턱 전압을 바꾸며, 이 차이를 디지털 상태로 해석합니다.",
  "절연막 속의 트랩에 전하를 포획합니다. 트랩 전하가 주변 채널의 문턱 전압을 바꾸며, 이 차이를 디지털 상태로 해석합니다.",
  "Holds charge in dielectric trap sites. The charge shifts the threshold of the surrounding channel; sensing interprets that change as a digital state."
 ],
 [
  "수직 채널",
  "수직 채널",
  "Vertical semiconductor channel"
 ],
 [
  "여러 셀이 공유하는 직렬 전류 경로입니다. 모든 비선택 셀이 통과 상태여도 선택 셀이 꺼져 있으면 전체 스트링 전류가 제한됩니다.",
  "여러 셀이 공유하는 직렬 전류 경로입니다. 모든 비선택 셀이 통과 상태여도 선택 셀이 꺼져 있으면 전체 스트링 전류가 제한됩니다.",
  "A series current path shared by multiple cells. Even if all unselected cells pass current, an off selected cell limits the whole string."
 ],
 [
  "터널 절연막",
  "터널 절연막",
  "Tunnel dielectric"
 ],
 [
  "채널과 저장층 사이의 절연막입니다. 프로그램 때의 전하 이동과 보존 때의 격리를 구분해야 합니다. 광점은 개별 전자의 실제 궤적이 아닙니다.",
  "채널과 저장층 사이의 절연막입니다. 프로그램 때의 전하 이동과 보존 때의 격리를 구분해야 합니다. 광점은 개별 전자의 실제 궤적이 아닙니다.",
  "The insulating layer between channel and storage layer. Charge transfer during programming and isolation during retention are different conditions. Light particles are not literal electron trajectories."
 ],
 [
  "블로킹 절연막",
  "블로킹 절연막",
  "Blocking dielectric"
 ],
 [
  "저장층과 제어 게이트 사이를 분리합니다. 다양한 유전체 스택을 대표 층으로 단순화했습니다.",
  "저장층과 제어 게이트 사이를 분리합니다. 다양한 유전체 스택을 대표 층으로 단순화했습니다.",
  "Separates the storage layer from the control gate. Different dielectric stacks are represented by one simplified layer."
 ],
 [
  "스트링 선택 게이트",
  "스트링 선택 게이트",
  "String select gate"
 ],
 [
  "스트링의 양 끝 연결을 선택합니다. 데이터 저장 WL과 달리 스트링 전체의 전류 경로를 제어합니다.",
  "스트링의 양 끝 연결을 선택합니다. 데이터 저장 WL과 달리 스트링 전체의 전류 경로를 제어합니다.",
  "Controls connections at both ends of the string. Unlike data word lines, these gates select the current path for the entire string."
 ],
 [
  "공통 소스라인",
  "공통 소스라인",
  "Common source line"
 ],
 [
  "여러 NAND 스트링이 공유하는 소스 측 연결입니다. 실제 바이어스와 소거 방식은 셀 구조에 따라 다릅니다.",
  "여러 NAND 스트링이 공유하는 소스 측 연결입니다. 실제 바이어스와 소거 방식은 셀 구조에 따라 다릅니다.",
  "The shared source-side connection for multiple strings. Bias conditions and erase methods depend on the cell structure."
 ],
 [
  "01-05장: 셀 구조, 데이터 접근 원리, 계층 구분. 특정 제품 수치와 공정 설명은 앱의 계산 모델에 사용하지 않았습니다.",
  "01-05장: 셀 구조, 데이터 접근 원리, 계층 구분. 특정 제품 수치와 공정 설명은 앱의 계산 모델에 사용하지 않았습니다.",
  "Chapters 01-05: cell structures, access principles and memory tiers. Product-specific numbers and fabrication descriptions are not used as simulation parameters."
 ],
 [
  "교차 결합 인버터, 액세스 트랜지스터, 보존·읽기·쓰기 원리.",
  "교차 결합 인버터, 액세스 트랜지스터, 보존·읽기·쓰기 원리.",
  "Cross-coupled inverters, access transistors and hold/read/write operation."
 ],
 [
  "셀 배열, 센스 앰프·워드라인 디코더, 외부 I/O의 구분.",
  "셀 배열, 센스 앰프·워드라인 디코더, 외부 I/O의 구분.",
  "Distinguishes cell arrays, sense amplifiers, word-line decoders and external I/O."
 ],
 [
  "ACTIVATE, charge sharing, sense amplification, restore, READ/WRITE, PRECHARGE.",
  "ACTIVATE, charge sharing, sense amplification, restore, READ/WRITE, PRECHARGE.",
  "ACTIVATE, charge sharing, sense amplification, restore, READ/WRITE and PRECHARGE."
 ],
 [
  "HBM을 새로운 저장 셀이 아니라 DRAM 기반의 적층·인터페이스 구조로 구분.",
  "HBM을 새로운 저장 셀이 아니라 DRAM 기반의 적층·인터페이스 구조로 구분.",
  "HBM is treated as DRAM-based stacking and interfacing, not a new bit-storage principle."
 ],
 [
  "Sandisk와의 HBF 공개 사양 발표 및 NAND 기반 고대역폭 메모리 구상. 발표 수치를 동작 보증값으로 재사용하지 않았습니다.",
  "Sandisk와의 HBF 공개 사양 발표 및 NAND 기반 고대역폭 메모리 구상. 발표 수치를 동작 보증값으로 재사용하지 않았습니다.",
  "Public HBF specification announcement with Sandisk and the NAND-based high-bandwidth concept. Announced numbers are not reused as guaranteed simulation performance."
 ],
 [
  "NAND 기반 HBF와 AI 추론 활용 방향. 미공개 장치 내부 구현은 개념 모델로 한정.",
  "NAND 기반 HBF와 AI 추론 활용 방향. 미공개 장치 내부 구현은 개념 모델로 한정.",
  "NAND-based HBF and AI inference use cases. Unpublished device internals are explicitly limited to a conceptual model."
 ],
 [
  "절연층으로 둘러싸인 전하 저장층과 비휘발성 저장의 기본 원리.",
  "절연층으로 둘러싸인 전하 저장층과 비휘발성 저장의 기본 원리.",
  "Charge storage surrounded by insulating layers and the principle of non-volatile retention."
 ],
 [
  "저장 전하·문턱 전압, 셀당 비트 수와 구분 가능한 상태 수.",
  "저장 전하·문턱 전압, 셀당 비트 수와 구분 가능한 상태 수.",
  "Stored charge, threshold voltage, bits per cell and distinguishable states."
 ],
 [
  "트랩 전하가 Vth에 영향을 미치는 CTF 저장 원리. 리텐션을 무한대로 취급하지 않음.",
  "트랩 전하가 Vth에 영향을 미치는 CTF 저장 원리. 리텐션을 무한대로 취급하지 않음.",
  "How trapped charge changes Vth. Retention is not assumed to be infinite."
 ],
 [
  "JTech-CO / RAM · 참고 저장소",
  "JTech-CO / RAM · 참고 저장소",
  "JTech-CO / RAM · reference repository"
 ],
 [
  "6T 래치가 전원이 켜진 동안 1비트를 유지합니다.",
  "6T 래치가 전원이 켜진 동안 1비트를 유지합니다.",
  "A 6T latch holds one bit while powered."
 ],
 [
  "캐시와 레지스터의 정보를 0과 1로 저장합니다.",
  "캐시와 레지스터의 정보를 0과 1로 저장합니다.",
  "Cache and register data become logic zeros and ones."
 ],
 [
  "6T 대표 구조 · 소자 크기와 잡음 마진은 미계산.",
  "6T 대표 구조 · 소자 크기와 잡음 마진은 미계산.",
  "Representative 6T structure; no sizing or noise-margin model."
 ],
 [
  "전하를 나누어 읽고, 감지한 값을 다시 복원합니다.",
  "전하를 나누어 읽고, 감지한 값을 다시 복원합니다.",
  "Share charge to read; restore the sensed value."
 ],
 [
  "행을 열고, 필요한 데이터를 행 버퍼에서 선택합니다.",
  "행을 열고, 필요한 데이터를 행 버퍼에서 선택합니다.",
  "Open a row, then select data from its row buffer."
 ],
 [
  "대표 1T1C 구조 · 전압과 누설은 교육용 가정.",
  "대표 1T1C 구조 · 전압과 누설은 교육용 가정.",
  "Representative 1T1C structure with teaching voltage and leakage values."
 ],
 [
  "DRAM 다이를 쌓고, 여러 경로로 데이터를 전송합니다.",
  "DRAM 다이를 쌓고, 여러 경로로 데이터를 전송합니다.",
  "Stack DRAM dies and transfer data along parallel paths."
 ],
 [
  "텐서와 KV 캐시를 넓은 경로로 연속 공급합니다.",
  "텐서와 KV 캐시를 넓은 경로로 연속 공급합니다.",
  "Wide paths continuously supply tensors and KV-cache data."
 ],
 [
  "적층·연결 개념도 · 제품별 타이밍은 미계산.",
  "적층·연결 개념도 · 제품별 타이밍은 미계산.",
  "Stack and interconnect model, not product-specific timing."
 ],
 [
  "NAND 저장 원리에 높은 병렬성을 결합합니다.",
  "NAND 저장 원리에 높은 병렬성을 결합합니다.",
  "NAND storage combined with highly parallel access."
 ],
 [
  "모델 가중치처럼 용량과 읽기 대역폭이 중요한 데이터.",
  "모델 가중치처럼 용량과 읽기 대역폭이 중요한 데이터.",
  "Data such as model weights, requiring capacity and read bandwidth."
 ],
 [
  "공개 구조 기반 개념도 · 특정 제품 에뮬레이터 아님.",
  "공개 구조 기반 개념도 · 특정 제품 에뮬레이터 아님.",
  "Public-architecture concept, not a product emulator."
 ],
 [
  "저장한 전하가 문턱 전압을 바꾸고, 그 상태를 읽습니다.",
  "저장한 전하가 문턱 전압을 바꾸고, 그 상태를 읽습니다.",
  "Stored charge shifts a threshold; sensing reads its state."
 ],
 [
  "문턱 상태를 비트로 해석하고, 페이지 단위로 다룹니다.",
  "문턱 상태를 비트로 해석하고, 페이지 단위로 다룹니다.",
  "Threshold states become bits handled in pages."
 ],
 [
  "CTF 대표 구조 · 실제 ECC·FTL은 구현하지 않음.",
  "CTF 대표 구조 · 실제 ECC·FTL은 구현하지 않음.",
  "Representative CTF structure; no actual ECC or FTL."
 ],
 [
  "BL과 BL̅을 높게 맞춥니다",
  "BL과 BL̅을 높게 맞춥니다",
  "Precharge BL and BL̅ high"
 ],
 [
  "두 비트라인을 같은 높은 전압으로 프리차지합니다. 저장 노드 Q와 Q̅은 그대로 유지됩니다.",
  "두 비트라인을 같은 높은 전압으로 프리차지합니다. 저장 노드 Q와 Q̅은 그대로 유지됩니다.",
  "Both bit lines are precharged to the same high voltage. The storage nodes Q and Q̅ retain their state."
 ],
 [
  "선택한 셀을 비트라인에 연결합니다",
  "선택한 셀을 비트라인에 연결합니다",
  "Connect the selected cell to the bit lines"
 ],
 [
  "워드라인이 두 액세스 NMOS를 동시에 켭니다.",
  "워드라인이 두 액세스 NMOS를 동시에 켭니다.",
  "The word line turns on both access NMOS devices together."
 ],
 [
  "한쪽 비트라인이 조금 내려갑니다",
  "한쪽 비트라인이 조금 내려갑니다",
  "One bit line drops slightly"
 ],
 [
  "0을 저장한 쪽의 풀다운 경로가 해당 비트라인을 방전합니다. 차동 센싱에 필요한 작은 전압차가 만들어집니다.",
  "0을 저장한 쪽의 풀다운 경로가 해당 비트라인을 방전합니다. 차동 센싱에 필요한 작은 전압차가 만들어집니다.",
  "The pull-down path on the zero side discharges its bit line, creating the small voltage difference needed for differential sensing."
 ],
 [
  "전압 차를 디지털 값으로 판정합니다",
  "전압 차를 디지털 값으로 판정합니다",
  "Resolve the voltage difference into a bit"
 ],
 [
  "센스 앰프가 두 선의 차이를 증폭합니다. 정상 동작에서는 래치의 저장 값을 파괴하지 않습니다.",
  "센스 앰프가 두 선의 차이를 증폭합니다. 정상 동작에서는 래치의 저장 값을 파괴하지 않습니다.",
  "The sense amplifier amplifies the difference between the two lines. A normal read does not destroy the latch state."
 ],
 [
  "셀을 다시 분리합니다",
  "셀을 다시 분리합니다",
  "Disconnect the cell again"
 ],
 [
  "WL을 내립니다. DRAM과 달리 읽기 후 커패시터 복원 단계가 없습니다.",
  "WL을 내립니다. DRAM과 달리 읽기 후 커패시터 복원 단계가 없습니다.",
  "WL is lowered. Unlike DRAM, no capacitor-restoration step follows the read."
 ],
 [
  "서로 반대인 비트라인을 구동합니다",
  "서로 반대인 비트라인을 구동합니다",
  "Drive complementary bit-line levels"
 ],
 [
  "쓰기 드라이버가 목표 비트에 따라 BL과 BL̅을 상보 전압으로 만듭니다.",
  "쓰기 드라이버가 목표 비트에 따라 BL과 BL̅을 상보 전압으로 만듭니다.",
  "The write driver sets BL and BL̅ to opposite voltages according to the target bit."
 ],
 [
  "액세스 트랜지스터를 켭니다",
  "액세스 트랜지스터를 켭니다",
  "Turn on the access transistors"
 ],
 [
  "WL이 두 패스 게이트를 열어 외부 쓰기 구동과 내부 래치를 연결합니다.",
  "WL이 두 패스 게이트를 열어 외부 쓰기 구동과 내부 래치를 연결합니다.",
  "WL opens both pass gates, connecting the external write drive to the internal latch."
 ],
 [
  "래치의 안정 상태를 바꿉니다",
  "래치의 안정 상태를 바꿉니다",
  "Change the stable latch state"
 ],
 [
  "쓰기 드라이버가 기존 상태를 이겨 Q와 Q̅을 반전시킵니다. 목표 값은 선택한 8비트 워드 전체에 적용됩니다.",
  "쓰기 드라이버가 기존 상태를 이겨 Q와 Q̅을 반전시킵니다. 목표 값은 선택한 8비트 워드 전체에 적용됩니다.",
  "The write driver overcomes the old state to establish the target Q and Q̅ levels. The target data applies to the selected eight-bit word."
 ],
 [
  "셀을 비트라인에서 분리합니다",
  "셀을 비트라인에서 분리합니다",
  "Disconnect the cell from the bit lines"
 ],
 [
  "WL을 내린 뒤에도 두 인버터의 양의 되먹임이 새 상태를 유지합니다.",
  "WL을 내린 뒤에도 두 인버터의 양의 되먹임이 새 상태를 유지합니다.",
  "After WL is lowered, positive feedback between the inverters holds the new state."
 ],
 [
  "새 데이터가 유지됩니다",
  "새 데이터가 유지됩니다",
  "Hold the new data"
 ],
 [
  "리프레시는 필요 없지만 전원은 필요합니다. Static은 비휘발성을 뜻하지 않습니다.",
  "리프레시는 필요 없지만 전원은 필요합니다. Static은 비휘발성을 뜻하지 않습니다.",
  "Refresh is unnecessary, but power is still required. Static does not mean non-volatile."
 ],
 [
  "비트라인 쌍을 VDD/2로 맞춥니다",
  "비트라인 쌍을 VDD/2로 맞춥니다",
  "Equalize the bit lines to VDD/2"
 ],
 [
  "닫힌 뱅크를 준비합니다. 다른 행이 열려 있었다면 복원 완료 후 그 행을 닫아야 합니다.",
  "닫힌 뱅크를 준비합니다. 다른 행이 열려 있었다면 복원 완료 후 그 행을 닫아야 합니다.",
  "Prepare a closed bank. If another row was open, its restoration must finish before it is closed."
 ],
 [
  "선택 행의 워드라인을 올립니다",
  "선택 행의 워드라인을 올립니다",
  "Raise the selected row word line"
 ],
 [
  "액세스 트랜지스터가 열려 해당 행의 커패시터들이 비트라인에 연결됩니다.",
  "액세스 트랜지스터가 열려 해당 행의 커패시터들이 비트라인에 연결됩니다.",
  "The access transistors connect the capacitors of the selected row to their bit lines."
 ],
 [
  "셀과 비트라인이 전하를 나눕니다",
  "셀과 비트라인이 전하를 나눕니다",
  "Share charge between cell and bit line"
 ],
 [
  "Cc가 Cb보다 작으므로 BL의 변화는 작습니다. 셀 전압은 크게 흔들리므로 감지 후 복원이 필요합니다.",
  "Cc가 Cb보다 작으므로 BL의 변화는 작습니다. 셀 전압은 크게 흔들리므로 감지 후 복원이 필요합니다.",
  "Cc is smaller than Cb, so the bit-line voltage changes only slightly. The cell voltage changes substantially and must be restored after sensing."
 ],
 [
  "작은 차이를 논리 전압으로 증폭합니다",
  "작은 차이를 논리 전압으로 증폭합니다",
  "Amplify the small difference to logic levels"
 ],
 [
  "센스 앰프가 BL과 기준선의 차이를 증폭하며 열린 행의 데이터를 잡습니다.",
  "센스 앰프가 BL과 기준선의 차이를 증폭하며 열린 행의 데이터를 잡습니다.",
  "The sense amplifier amplifies the bit-line difference relative to the reference and latches the open row."
 ],
 [
  "감지한 값을 셀에 다시 씁니다",
  "감지한 값을 셀에 다시 씁니다",
  "Write the sensed value back into the cell"
 ],
 [
  "전하 공유로 달라진 저장 전압을 원래 논리 전압으로 돌립니다. 실제 감지·복원은 겹쳐 진행되며 여기서는 설명을 위해 분리했습니다.",
  "전하 공유로 달라진 저장 전압을 원래 논리 전압으로 돌립니다. 실제 감지·복원은 겹쳐 진행되며 여기서는 설명을 위해 분리했습니다.",
  "Restore the voltage disturbed by charge sharing. Sensing and restoration overlap in hardware but are separated here for explanation."
 ],
 [
  "행 버퍼에서 데이터를 꺼냅니다",
  "행 버퍼에서 데이터를 꺼냅니다",
  "Read data from the row buffer"
 ],
 [
  "선택한 8비트 워드를 표시합니다. 행을 열린 채 남겨 다음 접근에서 행 적중을 실험할 수 있습니다.",
  "선택한 8비트 워드를 표시합니다. 행을 열린 채 남겨 다음 접근에서 행 적중을 실험할 수 있습니다.",
  "Display the selected eight-bit word. The row remains open so the next access can demonstrate a row hit."
 ],
 [
  "이미 열린 행을 사용합니다",
  "이미 열린 행을 사용합니다",
  "Reuse the already open row"
 ],
 [
  "같은 뱅크의 같은 행이 센스 앰프에 남아 있습니다. 새 ACT와 전하 공유를 반복하지 않습니다.",
  "같은 뱅크의 같은 행이 센스 앰프에 남아 있습니다. 새 ACT와 전하 공유를 반복하지 않습니다.",
  "The same row in the same bank remains latched in the sense amplifiers. A new ACT and charge-sharing phase are unnecessary."
 ],
 [
  "열 선택으로 데이터를 출력합니다",
  "열 선택으로 데이터를 출력합니다",
  "Select output data by column"
 ],
 [
  "열 멀티플렉서가 행 버퍼에서 필요한 데이터를 선택합니다.",
  "열 멀티플렉서가 행 버퍼에서 필요한 데이터를 선택합니다.",
  "The column multiplexer selects the required data from the row buffer."
 ],
 [
  "쓰기 드라이버가 새 값을 구동합니다",
  "쓰기 드라이버가 새 값을 구동합니다",
  "Drive the new write data"
 ],
 [
  "열 선택 회로를 통해 행 버퍼의 값을 바꾸고, 열린 WL을 통해 커패시터를 충전 또는 방전합니다.",
  "열 선택 회로를 통해 행 버퍼의 값을 바꾸고, 열린 WL을 통해 커패시터를 충전 또는 방전합니다.",
  "The column path updates the row buffer and charges or discharges the capacitor through the open word line."
 ],
 [
  "행의 저장 전압을 복원합니다",
  "행의 저장 전압을 복원합니다",
  "Restore row storage voltages"
 ],
 [
  "선택한 워드뿐 아니라 활성화된 행의 나머지 셀도 보존되어야 합니다.",
  "선택한 워드뿐 아니라 활성화된 행의 나머지 셀도 보존되어야 합니다.",
  "Cells outside the selected word must also retain their data while the row is active."
 ],
 [
  "새 값이 행 버퍼에 남습니다",
  "새 값이 행 버퍼에 남습니다",
  "Leave the new data in the row buffer"
 ],
 [
  "행은 열린 상태로 유지합니다. 같은 행을 다시 읽으면 ROW HIT 경로가 됩니다.",
  "행은 열린 상태로 유지합니다. 같은 행을 다시 읽으면 ROW HIT 경로가 됩니다.",
  "The row stays open. Reading the same row again follows the row-hit path."
 ],
 [
  "기존 행을 닫습니다",
  "기존 행을 닫습니다",
  "Close the previous row"
 ],
 [
  "리프레시를 위해 선택 뱅크를 준비합니다. 실제 REF 명령의 내부 행 선택은 장치가 관리합니다.",
  "리프레시를 위해 선택 뱅크를 준비합니다. 실제 REF 명령의 내부 행 선택은 장치가 관리합니다.",
  "Prepare the selected bank for refresh. A real device controls the internal row selection of a REF command."
 ],
 [
  "리프레시 행을 엽니다",
  "리프레시 행을 엽니다",
  "Open a row for refresh"
 ],
 [
  "사용자 읽기 없이 저장 전하를 감지합니다. 이 실험에서는 선택 행을 대표로 보여줍니다.",
  "사용자 읽기 없이 저장 전하를 감지합니다. 이 실험에서는 선택 행을 대표로 보여줍니다.",
  "Sense stored charge without a user read. This experiment uses the selected row as a representative refresh target."
 ],
 [
  "아직 구분되는 값을 감지합니다",
  "아직 구분되는 값을 감지합니다",
  "Sense values that remain distinguishable"
 ],
 [
  "누설 때문에 신호가 작아져도 판정 마진이 남아 있으면 원래 비트를 재생할 수 있습니다. 이미 소실된 정보는 복구하지 못합니다.",
  "누설 때문에 신호가 작아져도 판정 마진이 남아 있으면 원래 비트를 재생할 수 있습니다. 이미 소실된 정보는 복구하지 못합니다.",
  "Even after leakage reduces the signal, the original bit can be recovered if sensing margin remains. Information already lost cannot be reconstructed."
 ],
 [
  "행 전체의 전압을 복원합니다",
  "행 전체의 전압을 복원합니다",
  "Restore the whole row"
 ],
 [
  "센스 앰프가 값을 다시 구동합니다. DQ 데이터 출력을 만들기 위한 읽기가 아닙니다.",
  "센스 앰프가 값을 다시 구동합니다. DQ 데이터 출력을 만들기 위한 읽기가 아닙니다.",
  "The sense amplifier drives the values back into the cells. This is not a read intended to produce DQ output."
 ],
 [
  "행을 닫습니다",
  "행을 닫습니다",
  "Close the refreshed row"
 ],
 [
  "반복되는 내부 리프레시의 한 행을 보여주었습니다. 이 모델의 가상 ms는 특정 DDR 제품의 타이밍 사양이 아닙니다.",
  "반복되는 내부 리프레시의 한 행을 보여주었습니다. 이 모델의 가상 ms는 특정 DDR 제품의 타이밍 사양이 아닙니다.",
  "This shows one row of a recurring internal refresh operation. Virtual milliseconds here are not timing specifications for a particular DDR product."
 ],
 [
  "열린 행의 복원을 마칩니다",
  "열린 행의 복원을 마칩니다",
  "Finish restoring the open row"
 ],
 [
  "다른 행을 열기 전에 현재 행의 저장 전압을 복원해야 합니다.",
  "다른 행을 열기 전에 현재 행의 저장 전압을 복원해야 합니다.",
  "Restore the current row before activating a different row."
 ],
 [
  "행을 닫고 비트라인을 평형화합니다",
  "행을 닫고 비트라인을 평형화합니다",
  "Close the row and equalize the bit lines"
 ],
 [
  "워드라인을 내리고 비트라인 쌍을 VDD/2로 맞춥니다. 행 버퍼는 더 이상 열린 행을 뜻하지 않습니다.",
  "워드라인을 내리고 비트라인 쌍을 VDD/2로 맞춥니다. 행 버퍼는 더 이상 열린 행을 뜻하지 않습니다.",
  "Lower WL and equalize the bit-line pair to VDD/2. The row buffer no longer represents an open row."
 ],
 [
  "채널·뱅크·행 주소를 전달합니다",
  "채널·뱅크·행 주소를 전달합니다",
  "Deliver channel, bank and row addresses"
 ],
 [
  "여러 독립 채널이 DRAM 뱅크 접근을 분담합니다. 이 예제는 이전 행을 닫고 새 접근을 시작합니다. 실제 컨트롤러의 행 버퍼 정책과 타이밍은 별도입니다.",
  "여러 독립 채널이 DRAM 뱅크 접근을 분담합니다. 이 예제는 이전 행을 닫고 새 접근을 시작합니다. 실제 컨트롤러의 행 버퍼 정책과 타이밍은 별도입니다.",
  "Independent channels distribute accesses across DRAM banks. This example closes the previous row before beginning a new access; real controller row policies and timings are separate."
 ],
 [
  "해당 DRAM 행을 엽니다",
  "해당 DRAM 행을 엽니다",
  "Activate the target DRAM row"
 ],
 [
  "HBM도 1T1C 셀입니다. 워드라인과 비트라인, 센스 앰프를 이용합니다.",
  "HBM도 1T1C 셀입니다. 워드라인과 비트라인, 센스 앰프를 이용합니다.",
  "HBM also uses 1T1C cells, word lines, bit lines and sense amplifiers."
 ],
 [
  "커패시터의 전하를 감지 경로로 보냅니다",
  "커패시터의 전하를 감지 경로로 보냅니다",
  "Share capacitor charge with the sensing path"
 ],
 [
  "수직 적층이 전하 공유를 없애지 않습니다. 셀 접근 지연과 외부 대역폭은 별개의 값입니다.",
  "수직 적층이 전하 공유를 없애지 않습니다. 셀 접근 지연과 외부 대역폭은 별개의 값입니다.",
  "Vertical stacking does not remove charge sharing. Cell-access latency and external bandwidth are separate quantities."
 ],
 [
  "행 데이터를 감지하고 복원합니다",
  "행 데이터를 감지하고 복원합니다",
  "Sense and restore the row"
 ],
 [
  "동일한 DRAM 저장 원리를 사용하므로 복원과 리프레시가 여전히 필요합니다.",
  "동일한 DRAM 저장 원리를 사용하므로 복원과 리프레시가 여전히 필요합니다.",
  "The underlying DRAM principle is unchanged, so restoration and refresh are still necessary."
 ],
 [
  "여러 데이터 경로가 병렬로 움직입니다",
  "여러 데이터 경로가 병렬로 움직입니다",
  "Transfer data through parallel vertical paths"
 ],
 [
  "TSV는 수직 전기 연결이고 저장 소자가 아닙니다. 연속 버스트가 넓은 데이터 인터페이스를 활용합니다.",
  "TSV는 수직 전기 연결이고 저장 소자가 아닙니다. 연속 버스트가 넓은 데이터 인터페이스를 활용합니다.",
  "TSVs are vertical electrical connections, not storage cells. Bursts use a wide data interface."
 ],
 [
  "인터포저를 건너 데이터를 전달합니다",
  "인터포저를 건너 데이터를 전달합니다",
  "Transfer data across the interposer"
 ],
 [
  "표시된 병렬 경로 수는 교육용입니다. 버스 폭과 전송률을 함께 봐야 대역폭을 계산할 수 있습니다.",
  "표시된 병렬 경로 수는 교육용입니다. 버스 폭과 전송률을 함께 봐야 대역폭을 계산할 수 있습니다.",
  "The displayed path count is illustrative. Both bus width and transfer rate are needed to calculate bandwidth."
 ],
 [
  "쓰기 주소를 제어 경로로 보냅니다",
  "쓰기 주소를 제어 경로로 보냅니다",
  "Send the write address through the control path"
 ],
 [
  "이 예제는 이전 행을 닫고 새 접근을 시작합니다. 실제 HBM 컨트롤러의 행 버퍼 정책과 JEDEC 명령 타이밍은 구현별로 다릅니다.",
  "이 예제는 이전 행을 닫고 새 접근을 시작합니다. 실제 HBM 컨트롤러의 행 버퍼 정책과 JEDEC 명령 타이밍은 구현별로 다릅니다.",
  "This example closes the previous row before a new access. Actual HBM row-buffer policies and JEDEC command timings depend on the implementation."
 ],
 [
  "쓰기 대상 DRAM 행을 엽니다",
  "쓰기 대상 DRAM 행을 엽니다",
  "Open the destination DRAM row"
 ],
 [
  "해당 행의 액세스 MOS를 켭니다. 적층 여부와 무관하게 행의 기존 상태를 먼저 감지해야 합니다.",
  "해당 행의 액세스 MOS를 켭니다. 적층 여부와 무관하게 행의 기존 상태를 먼저 감지해야 합니다.",
  "Activate the access MOS devices. The original row state must be sensed regardless of whether dies are stacked."
 ],
 [
  "기존 저장 전하를 공유합니다",
  "기존 저장 전하를 공유합니다",
  "Share the existing stored charge"
 ],
 [
  "1T1C 셀과 비트라인의 작은 전압차를 만듭니다.",
  "1T1C 셀과 비트라인의 작은 전압차를 만듭니다.",
  "The 1T1C cell creates a small voltage difference on the bit line."
 ],
 [
  "행의 기존 값을 감지·보존합니다",
  "행의 기존 값을 감지·보존합니다",
  "Sense and preserve the original row"
 ],
 [
  "부분 쓰기에서 다른 셀의 정보를 잃지 않도록 기존 행을 센스 앰프에 잡고 복원합니다.",
  "부분 쓰기에서 다른 셀의 정보를 잃지 않도록 기존 행을 센스 앰프에 잡고 복원합니다.",
  "Latch and restore the existing row so a partial write does not destroy data in other cells."
 ],
 [
  "가속기에서 쓰기 데이터를 보냅니다",
  "가속기에서 쓰기 데이터를 보냅니다",
  "Send write data from the accelerator"
 ],
 [
  "쓰기 데이터의 방향은 읽기의 반대입니다. 가속기에서 인터포저와 베이스 다이 쪽으로 이동합니다.",
  "쓰기 데이터의 방향은 읽기의 반대입니다. 가속기에서 인터포저와 베이스 다이 쪽으로 이동합니다.",
  "The write direction is opposite to a read: from the accelerator, across the interposer and toward the base die."
 ],
 [
  "수직 경로로 데이터를 전달합니다",
  "수직 경로로 데이터를 전달합니다",
  "Deliver data through vertical connections"
 ],
 [
  "적층 DRAM의 대상 배열에 쓰기 데이터가 전달됩니다. 대표 선들은 실제 주소 배선이나 핀 수를 재현하지 않습니다.",
  "적층 DRAM의 대상 배열에 쓰기 데이터가 전달됩니다. 대표 선들은 실제 주소 배선이나 핀 수를 재현하지 않습니다.",
  "Write data reaches the target stacked-DRAM array. Representative lines do not reproduce physical address wiring or pin counts."
 ],
 [
  "드라이버가 새 셀 전압을 구동합니다",
  "드라이버가 새 셀 전압을 구동합니다",
  "Drive and restore the new cell voltages"
 ],
 [
  "선택된 워드의 데이터를 바꾸고 저장 커패시터의 전압을 복원합니다.",
  "선택된 워드의 데이터를 바꾸고 저장 커패시터의 전압을 복원합니다.",
  "Update the selected word and restore the storage capacitor voltages."
 ],
 [
  "새 데이터가 저장되었습니다",
  "새 데이터가 저장되었습니다",
  "The new data is stored"
 ],
 [
  "우측 읽기·쓰기 결과는 교육용 검증 표시입니다. 쓰기 명령이 데이터 에코를 외부 DQ로 자동 반환한다는 뜻이 아닙니다.",
  "우측 읽기·쓰기 결과는 교육용 검증 표시입니다. 쓰기 명령이 데이터 에코를 외부 DQ로 자동 반환한다는 뜻이 아닙니다.",
  "The read/write result is a teaching verification display. It does not imply that a write command automatically echoes data on external DQ pins."
 ],
 [
  "요청을 제어 로직에 전달합니다",
  "요청을 제어 로직에 전달합니다",
  "Deliver a request to the control logic"
 ],
 [
  "HBF는 NAND 기반 비휘발성 메모리입니다. HBM과 같은 셀이나 동일한 임의 바이트 덮어쓰기 모델로 취급하지 않습니다.",
  "HBF는 NAND 기반 비휘발성 메모리입니다. HBM과 같은 셀이나 동일한 임의 바이트 덮어쓰기 모델로 취급하지 않습니다.",
  "HBF is NAND-based non-volatile memory. It is not modeled as an HBM bit cell or as unrestricted random byte overwriting."
 ],
 [
  "독립적인 NAND 배열을 선택합니다",
  "독립적인 NAND 배열을 선택합니다",
  "Select independent NAND arrays"
 ],
 [
  "병렬 서브어레이가 여러 요청을 겹쳐 처리하도록 표현했습니다. 내부 배선과 큐 구성은 개념 모델입니다.",
  "병렬 서브어레이가 여러 요청을 겹쳐 처리하도록 표현했습니다. 내부 배선과 큐 구성은 개념 모델입니다.",
  "Parallel subarrays are shown overlapping multiple requests. Internal wiring and queue structures are conceptual."
 ],
 [
  "각 배열에서 문턱 전압을 판정합니다",
  "각 배열에서 문턱 전압을 판정합니다",
  "Sense thresholds in each array"
 ],
 [
  "셀 읽기는 여전히 NAND의 센싱 동작입니다. 병렬도가 커져도 단일 셀의 지연이 DRAM처럼 바뀌지 않습니다.",
  "셀 읽기는 여전히 NAND의 센싱 동작입니다. 병렬도가 커져도 단일 셀의 지연이 DRAM처럼 바뀌지 않습니다.",
  "Individual cell reads still use NAND sensing. More parallelism does not turn a single-cell read into a DRAM-latency operation."
 ],
 [
  "읽은 데이터를 버퍼에 모읍니다",
  "읽은 데이터를 버퍼에 모읍니다",
  "Collect sensed data in the buffer"
 ],
 [
  "오류 정정과 데이터 재배열은 제어 경로에 속합니다. 이 앱은 실제 ECC 코드를 계산하지 않고 위치를 표시합니다.",
  "오류 정정과 데이터 재배열은 제어 경로에 속합니다. 이 앱은 실제 ECC 코드를 계산하지 않고 위치를 표시합니다.",
  "Error correction and rearrangement belong to the control path. The app shows where ECC belongs but does not calculate an actual ECC code."
 ],
 [
  "여러 경로로 데이터를 전달합니다",
  "여러 경로로 데이터를 전달합니다",
  "Transfer data along multiple paths"
 ],
 [
  "겹치는 배열 접근과 넓은 전송 경로가 대역폭을 만듭니다. 화면의 선 수는 실제 표준 핀 수가 아닙니다.",
  "겹치는 배열 접근과 넓은 전송 경로가 대역폭을 만듭니다. 화면의 선 수는 실제 표준 핀 수가 아닙니다.",
  "Overlapped array accesses and wide connections provide throughput. Displayed lines are not the pin count of a standard."
 ],
 [
  "제어 로직이 요청 결과를 돌려줍니다",
  "제어 로직이 요청 결과를 돌려줍니다",
  "Return the request result"
 ],
 [
  "가속기와의 연계는 구현에 따라 다릅니다. 공개 구조를 바탕으로 한 개념 시각화이며 특정 HBF 제품 에뮬레이터가 아닙니다.",
  "가속기와의 연계는 구현에 따라 다릅니다. 공개 구조를 바탕으로 한 개념 시각화이며 특정 HBF 제품 에뮬레이터가 아닙니다.",
  "Accelerator integration depends on the implementation. This is a public-architecture concept, not an emulator of a particular HBF product."
 ],
 [
  "쓰기 데이터를 페이지 버퍼에 놓습니다",
  "쓰기 데이터를 페이지 버퍼에 놓습니다",
  "Load target data into the page buffer"
 ],
 [
  "표시한 8개 셀은 한 WL의 표본입니다. MLC 이상은 여러 논리 페이지에 걸친 상태를 한 번에 다루는 축약 모델이며, 실제 페이지·다중 패스 프로그램과 다릅니다.",
  "표시한 8개 셀은 한 WL의 표본입니다. MLC 이상은 여러 논리 페이지에 걸친 상태를 한 번에 다루는 축약 모델이며, 실제 페이지·다중 패스 프로그램과 다릅니다.",
  "Eight cells sample one word line. Multi-bit modes combine states from several logical pages in an abstract operation, not an actual multipass page-program sequence."
 ],
 [
  "선택 워드라인에 프로그램 조건을 겁니다",
  "선택 워드라인에 프로그램 조건을 겁니다",
  "Set up program conditions on the selected WL"
 ],
 [
  "선택 페이지의 셀별 목표 상태에 따라 프로그램 또는 억제 조건이 달라집니다. 정확한 고전압 값은 제품별로 다릅니다.",
  "선택 페이지의 셀별 목표 상태에 따라 프로그램 또는 억제 조건이 달라집니다. 정확한 고전압 값은 제품별로 다릅니다.",
  "Each target cell is either programmed or inhibited according to its desired state. Exact high-voltage values are product-specific."
 ],
 [
  "프로그램 펄스로 문턱 전압을 올립니다",
  "프로그램 펄스로 문턱 전압을 올립니다",
  "Increase the threshold with program pulses"
 ],
 [
  "저장층의 전하가 증가하면서 Vt가 이동합니다. 실제 장치의 ISPP 반복을 이 단계에서는 축약해서 보여줍니다.",
  "저장층의 전하가 증가하면서 Vt가 이동합니다. 실제 장치의 ISPP 반복을 이 단계에서는 축약해서 보여줍니다.",
  "Additional trapped charge shifts Vt. Real repeated ISPP cycles are condensed into this visual step."
 ],
 [
  "목표 문턱 구간을 확인합니다",
  "목표 문턱 구간을 확인합니다",
  "Verify the target threshold interval"
 ],
 [
  "프로그램과 검증을 반복해 목표 구간에 도달한 셀의 추가 프로그램을 억제합니다.",
  "프로그램과 검증을 반복해 목표 구간에 도달한 셀의 추가 프로그램을 억제합니다.",
  "Program and verify cycles inhibit further programming of cells that have reached their target interval."
 ],
 [
  "프로그램된 페이지를 확정합니다",
  "프로그램된 페이지를 확정합니다",
  "Commit the programmed page"
 ],
 [
  "이 교육용 모델은 동일 페이지 재프로그램을 금지합니다. 다른 값을 덮어쓰려면 소거 또는 컨트롤러의 새 페이지 매핑이 필요합니다.",
  "이 교육용 모델은 동일 페이지 재프로그램을 금지합니다. 다른 값을 덮어쓰려면 소거 또는 컨트롤러의 새 페이지 매핑이 필요합니다.",
  "This teaching model prohibits reprogramming a page. A different value requires erasing the block or, in a controller, mapping to a new page."
 ],
 [
  "페이지 데이터를 확인합니다",
  "페이지 데이터를 확인합니다",
  "Check the page data"
 ],
 [
  "전원을 꺼도 저장층의 문턱 상태는 유지됩니다. 무한 보존·무제한 내구성을 뜻하지는 않습니다.",
  "전원을 꺼도 저장층의 문턱 상태는 유지됩니다. 무한 보존·무제한 내구성을 뜻하지는 않습니다.",
  "Cell threshold states remain after power is removed. This does not imply infinite retention or unlimited endurance."
 ],
 [
  "블록을 지정합니다",
  "블록을 지정합니다",
  "Select a block"
 ],
 [
  "페이지 한 개가 아니라 선택한 물리 블록의 모든 워드라인이 소거 대상입니다.",
  "페이지 한 개가 아니라 선택한 물리 블록의 모든 워드라인이 소거 대상입니다.",
  "Every word line in the selected physical block is an erase target, not just one page."
 ],
 [
  "저장층 전하를 줄입니다",
  "저장층 전하를 줄입니다",
  "Reduce stored charge"
 ],
 [
  "소거 바이어스로 전하 상태를 되돌립니다. 실제 주입·탈출 메커니즘은 셀 구조에 따라 다르며, 여기서는 문턱 전압의 감소를 모델링합니다.",
  "소거 바이어스로 전하 상태를 되돌립니다. 실제 주입·탈출 메커니즘은 셀 구조에 따라 다르며, 여기서는 문턱 전압의 감소를 모델링합니다.",
  "Erase bias returns the charge state toward its erased condition. The physical charge-transfer mechanism depends on the cell; this model represents the decrease in threshold voltage."
 ],
 [
  "소거 상태를 검증합니다",
  "소거 상태를 검증합니다",
  "Verify the erased state"
 ],
 [
  "블록 안 모든 셀이 소거 문턱 구간에 도달해야 합니다.",
  "블록 안 모든 셀이 소거 문턱 구간에 도달해야 합니다.",
  "Every cell in the block must reach the erased threshold interval."
 ],
 [
  "블록 전체가 소거되었습니다",
  "블록 전체가 소거되었습니다",
  "The whole block is erased"
 ],
 [
  "모든 페이지의 셀을 E 상태로 되돌립니다. 이 예시 매핑에서 E는 모든 비트가 1입니다.",
  "모든 페이지의 셀을 E 상태로 되돌립니다. 이 예시 매핑에서 E는 모든 비트가 1입니다.",
  "Return all page cells to E. In this example mapping, E represents all-one bits."
 ],
 [
  "페이지와 NAND 스트링을 선택합니다",
  "페이지와 NAND 스트링을 선택합니다",
  "Select the page and NAND string"
 ],
 [
  "여러 셀이 수직 채널을 공유하며 직렬로 연결됩니다. 양 끝 선택 게이트가 스트링의 접근을 제어합니다.",
  "여러 셀이 수직 채널을 공유하며 직렬로 연결됩니다. 양 끝 선택 게이트가 스트링의 접근을 제어합니다.",
  "Multiple cells share a vertical channel in series. Selection gates at both ends control access to the string."
 ],
 [
  "선택하지 않은 셀을 통과시킵니다",
  "선택하지 않은 셀을 통과시킵니다",
  "Pass current through unselected cells"
 ],
 [
  "비선택 WL에는 통과 전압을 인가해 해당 셀들이 직렬 경로를 막지 않도록 합니다.",
  "비선택 WL에는 통과 전압을 인가해 해당 셀들이 직렬 경로를 막지 않도록 합니다.",
  "A pass bias on unselected word lines prevents those cells from blocking the series path."
 ],
 [
  "선택 WL에 읽기 기준을 인가합니다",
  "선택 WL에 읽기 기준을 인가합니다",
  "Apply the read reference to the selected WL"
 ],
 [
  "선택 셀의 Vt보다 읽기 기준이 높으면 채널이 도통합니다. 전압 숫자 자체를 직접 꺼내오는 것이 아니라 전류 유무를 감지합니다.",
  "선택 셀의 Vt보다 읽기 기준이 높으면 채널이 도통합니다. 전압 숫자 자체를 직접 꺼내오는 것이 아니라 전류 유무를 감지합니다.",
  "The selected cell conducts when the read reference exceeds its Vt. A read senses current, rather than extracting a stored voltage number."
 ],
 [
  "전류 결과로 문턱 구간을 판정합니다",
  "전류 결과로 문턱 구간을 판정합니다",
  "Resolve the threshold interval from current"
 ],
 [
  "다중 레벨 셀은 여러 경계를 사용합니다. 우측 Vref는 한 비교기의 관찰용 기준입니다. 완전한 디지털 출력은 모든 경계의 이상적인 비교 결과를 결합해 판정합니다.",
  "다중 레벨 셀은 여러 경계를 사용합니다. 우측 Vref는 한 비교기의 관찰용 기준입니다. 완전한 디지털 출력은 모든 경계의 이상적인 비교 결과를 결합해 판정합니다.",
  "Multi-level cells use several decision boundaries. The Vref slider observes one comparison; complete digital output combines ideal comparisons across all boundaries."
 ],
 [
  "셀 상태를 페이지 버퍼에 담습니다",
  "셀 상태를 페이지 버퍼에 담습니다",
  "Latch cell states in the page buffer"
 ],
 [
  "여러 센싱 결과를 비트로 해석합니다. 오류 정정은 이 경로의 기능이며 본 모델은 ECC 처리를 추상화합니다.",
  "여러 센싱 결과를 비트로 해석합니다. 오류 정정은 이 경로의 기능이며 본 모델은 ECC 처리를 추상화합니다.",
  "Interpret multiple sensing results as bits. Error correction belongs to this path but is abstracted rather than executed here."
 ],
 [
  "디지털 데이터를 출력합니다",
  "디지털 데이터를 출력합니다",
  "Output digital data"
 ],
 [
  "SLC·MLC·TLC·QLC 선택에 따라 한 셀의 상태 수는 2·4·8·16개입니다. 소거는 페이지가 아니라 블록 단위입니다.",
  "SLC·MLC·TLC·QLC 선택에 따라 한 셀의 상태 수는 2·4·8·16개입니다. 소거는 페이지가 아니라 블록 단위입니다.",
  "SLC, MLC, TLC and QLC use 2, 4, 8 and 16 states per cell. Erasing acts on a block, not a page."
 ],
 [
  "본문으로 이동",
  "본문으로 이동",
  "Skip to content"
 ],
 [
  "메모리 종류",
  "메모리 종류",
  "Memory types"
 ],
 [
  "RAM Lab 홈",
  "RAM Lab 홈",
  "RAM Lab home"
 ],
 [
  "래치",
  "래치",
  "Latch"
 ],
 [
  "커패시터",
  "커패시터",
  "Capacitor"
 ],
 [
  "전하 저장층",
  "전하 저장층",
  "Charge storage"
 ],
 [
  "HBM은 DRAM 계열,",
  "HBM은 DRAM 계열,",
  "HBM uses DRAM cells;"
 ],
 [
  "HBF는 NAND 계열입니다.",
  "HBF는 NAND 계열입니다.",
  "HBF uses NAND cells."
 ],
 [
  "자료 출처와 모델 범위",
  "자료 출처와 모델 범위",
  "Sources and model scope"
 ],
 [
  "검토 기준",
  "검토 기준",
  "Reference date"
 ],
 [
  "계층 비교",
  "계층 비교",
  "Compare"
 ],
 [
  "현재 상태를 JSON으로 저장",
  "현재 상태를 JSON으로 저장",
  "Save current state as JSON"
 ],
 [
  "사용법 및 단축키",
  "사용법 및 단축키",
  "Help and keyboard shortcuts"
 ],
 [
  "언어 선택",
  "언어 선택",
  "Language"
 ],
 [
  "한국어",
  "한국어",
  "Korean"
 ],
 [
  "3D 구조",
  "3D 구조",
  "3D structure"
 ],
 [
  "회로 보기",
  "회로 보기",
  "Circuit"
 ],
 [
  "셀 배열",
  "셀 배열",
  "Cell array"
 ],
 [
  "시각화 방식",
  "시각화 방식",
  "Visualization mode"
 ],
 [
  "메모리 탐색기",
  "메모리 탐색기",
  "Memory explorer"
 ],
 [
  "주석",
  "주석",
  "Labels"
 ],
 [
  "구조 주석 표시",
  "구조 주석 표시",
  "Show structure labels"
 ],
 [
  "3D 장면 PNG 저장",
  "3D 장면 PNG 저장",
  "Save 3D scene as PNG"
 ],
 [
  "시점 초기화 (R)",
  "시점 초기화 (R)",
  "Reset view (R)"
 ],
 [
  "시점 초기화",
  "시점 초기화",
  "Reset view"
 ],
 [
  "시각화 전체 화면",
  "시각화 전체 화면",
  "Expand viewer"
 ],
 [
  "확대와 이동이 가능한 회로도",
  "확대와 이동이 가능한 회로도",
  "Interactive circuit diagram. Drag to pan; wheel or pinch to zoom."
 ],
 [
  "동작 회로도",
  "동작 회로도",
  "Circuit diagram"
 ],
 [
  "주소별 메모리 셀 상태",
  "주소별 메모리 셀 상태",
  "Memory states by address"
 ],
 [
  "회로 확대 제어",
  "회로 확대 제어",
  "Circuit zoom controls"
 ],
 [
  "회로 축소",
  "회로 축소",
  "Zoom out of circuit"
 ],
 [
  "축소 (-)",
  "축소 (-)",
  "Zoom out (-)"
 ],
 [
  "회로 확대",
  "회로 확대",
  "Zoom into circuit"
 ],
 [
  "확대 (+)",
  "확대 (+)",
  "Zoom in (+)"
 ],
 [
  "전체 보기",
  "전체 보기",
  "Fit"
 ],
 [
  "기본 배율",
  "기본 배율",
  "Reset"
 ],
 [
  "드래그 이동 · 핀치 / 휠 확대",
  "드래그 이동 · 핀치 / 휠 확대",
  "Drag to pan · pinch / wheel to zoom"
 ],
 [
  "대표 구조 · 축척 비례 아님",
  "대표 구조 · 축척 비례 아님",
  "Representative structure · not to scale"
 ],
 [
  "공개 구조 기반 개념 모델 · 축척 비례 아님",
  "공개 구조 기반 개념 모델 · 축척 비례 아님",
  "Public-architecture concept · not to scale"
 ],
 [
  "이 환경에서는 WebGL 2를 사용할 수 없습니다.",
  "이 환경에서는 WebGL 2를 사용할 수 없습니다.",
  "WebGL 2 is unavailable in this environment."
 ],
 [
  "회로와 셀 배열, 읽기·쓰기 시뮬레이션은 계속 사용할 수 있습니다.",
  "회로와 셀 배열, 읽기·쓰기 시뮬레이션은 계속 사용할 수 있습니다.",
  "Circuit, cell-array and read/write simulations remain available."
 ],
 [
  "회전 및 확대가 가능한 반도체 3D 모델. 접근 가능한 회로 설명은 회로 보기 탭에 있습니다.",
  "회전 및 확대가 가능한 반도체 3D 모델. 접근 가능한 회로 설명은 회로 보기 탭에 있습니다.",
  "Rotatable, zoomable 3D semiconductor model. An accessible circuit description is available in the Circuit tab."
 ],
 [
  "드래그 회전",
  "드래그 회전",
  "Drag to rotate"
 ],
 [
  "휠 확대",
  "휠 확대",
  "Wheel to zoom"
 ],
 [
  "구조 주석 선택",
  "구조 주석 선택",
  "Select a label"
 ],
 [
  "단면 열기",
  "단면 열기",
  "Cutaway"
 ],
 [
  "분해",
  "분해",
  "Explode"
 ],
 [
  "모델 분해 정도",
  "모델 분해 정도",
  "Model separation"
 ],
 [
  "관찰 다이",
  "관찰 다이",
  "View die"
 ],
 [
  "관찰할 다이",
  "관찰할 다이",
  "Die to inspect"
 ],
 [
  "자동 회전",
  "자동 회전",
  "Auto-rotate"
 ],
 [
  "회전 정지",
  "회전 정지",
  "Stop rotation"
 ],
 [
  "신호·데이터 경로",
  "신호·데이터 경로",
  "Signal / data path"
 ],
 [
  "전하·게이트 제어",
  "전하·게이트 제어",
  "Charge / gate control"
 ],
 [
  "광점은 진행 방향을 표시하며 전자 궤적이 아닙니다.",
  "광점은 진행 방향을 표시하며 전자 궤적이 아닙니다.",
  "Light particles show progress, not electron trajectories."
 ],
 [
  "실시간 동작 분석",
  "실시간 동작 분석",
  "Live operation inspector"
 ],
 [
  "전원 ON",
  "전원 ON",
  "Power ON"
 ],
 [
  "전원 OFF",
  "전원 OFF",
  "Power OFF"
 ],
 [
  "단계 상세 설명",
  "단계 상세 설명",
  "Operation details"
 ],
 [
  "시간축 정규화 · 설명용",
  "시간축 정규화 · 설명용",
  "Normalized time · illustrative"
 ],
 [
  "정규화 Vt · 예시 분포",
  "정규화 Vt · 예시 분포",
  "Normalized Vt · illustrative"
 ],
 [
  "셀당 정보",
  "셀당 정보",
  "Bits per cell"
 ],
 [
  "읽기 기준 Vref",
  "읽기 기준 Vref",
  "Read reference Vref"
 ],
 [
  "정규화 읽기 기준 전압",
  "정규화 읽기 기준 전압",
  "Normalized read reference voltage"
 ],
 [
  "자동 리프레시",
  "자동 리프레시",
  "Auto-refresh"
 ],
 [
  "가상 시간 +20 ms",
  "가상 시간 +20 ms",
  "Advance +20 ms"
 ],
 [
  "예시 누설 모델 · 실제 장치 시간과 다릅니다.",
  "예시 누설 모델 · 실제 장치 시간과 다릅니다.",
  "Illustrative leakage, not device timing."
 ],
 [
  "대표 병렬 경로",
  "대표 병렬 경로",
  "Illustrative paths"
 ],
 [
  "채널 수·다이 수·핀 수는 서로 다른 지표입니다.",
  "채널 수 ≠ 다이 수 ≠ 핀 수.",
  "Channels, dies and pins are different counts."
 ],
 [
  "동작 제어",
  "동작 제어",
  "Operation controls"
 ],
 [
  "뱅크 또는 대표 블록 선택",
  "뱅크 또는 대표 블록 선택",
  "Bank or illustrative block"
 ],
 [
  "행 또는 페이지 선택",
  "행 또는 페이지 선택",
  "Row or page"
 ],
 [
  "관찰할 열 또는 스트링 선택",
  "관찰할 열 또는 스트링 선택",
  "Column or string to inspect"
 ],
 [
  "동작 단계",
  "동작 단계",
  "Operation stages"
 ],
 [
  "동작 재생",
  "동작 재생",
  "Play"
 ],
 [
  "일시 정지",
  "일시 정지",
  "Pause"
 ],
 [
  "다시 재생",
  "다시 재생",
  "Replay"
 ],
 [
  "동작 일시 정지",
  "동작 일시 정지",
  "Pause operation"
 ],
 [
  "이전",
  "이전",
  "Back"
 ],
 [
  "다음",
  "다음",
  "Next"
 ],
 [
  "이전 단계 (←)",
  "이전 단계 (←)",
  "Previous stage (←)"
 ],
 [
  "다음 단계 (→)",
  "다음 단계 (→)",
  "Next stage (→)"
 ],
 [
  "이번 동작 처음부터",
  "이번 동작 처음부터",
  "Replay this operation"
 ],
 [
  "속도",
  "속도",
  "Speed"
 ],
 [
  "단계 탐색은 이번 연산을 재현합니다.",
  "단계 탐색은 이번 연산을 재현합니다.",
  "Stage navigation replays the current operation."
 ],
 [
  "메모리 초기화",
  "메모리 초기화",
  "Reset memory"
 ],
 [
  "데이터 입출력",
  "데이터 입출력",
  "Data input and output"
 ],
 [
  "쓸 데이터 16진수",
  "쓸 데이터 16진수",
  "Write data in hexadecimal"
 ],
 [
  "문자 입력",
  "문자 입력",
  "Enter text"
 ],
 [
  "UTF-8로 변환할 문자",
  "UTF-8로 변환할 문자",
  "Text to encode as UTF-8"
 ],
 [
  "목표 데이터를 입력하고 ‘쓰기’ 동작을 재생하세요.",
  "입력 후 ‘쓰기’를 재생하세요.",
  "Enter data, then play Write."
 ],
 [
  "8개 셀의 상태를 표시합니다. 선택 열은 테두리로 강조됩니다.",
  "8개 셀의 상태를 표시합니다. 선택 열은 테두리로 강조됩니다.",
  "Eight cell states; the outlined cell is selected."
 ],
 [
  "읽기가 출력 단계에 도달하면 결과가 표시됩니다.",
  "읽기가 출력 단계에 도달하면 결과가 표시됩니다.",
  "The result appears at the output stage."
 ],
 [
  "셀은 데이터의 의미를 모릅니다.",
  "비트가 담는 정보",
  "Interpreting bits"
 ],
 [
  "사실적인 구조, 명시적인 단순화.",
  "구조와 모델의 한계",
  "Structure and assumptions"
 ],
 [
  "자세히 보기",
  "자세히 보기",
  "Read details"
 ],
 [
  "근거 자료와 가정 보기 ↗",
  "근거 자료와 가정 보기 ↗",
  "Sources and assumptions ↗"
 ],
 [
  "셀 · 회로 · 배열 · 데이터 경로",
  "셀 · 회로 · 배열 · 데이터 경로",
  "Cells · circuits · arrays · data paths"
 ],
 [
  "제조 공정이 아닌 작동 원리를 탐색합니다.",
  "제조 공정이 아닌 작동 원리를 탐색합니다.",
  "Explore operation, not manufacturing."
 ],
 [
  "셀 · 회로 · 배열 · 데이터 경로 - 제조 공정이 아닌 작동 원리를 탐색합니다.",
  "셀 · 회로 · 배열 · 데이터 경로 - 제조 공정이 아닌 작동 원리를 탐색합니다.",
  "Cells · circuits · arrays · data paths. Operation, not manufacturing."
 ],
 [
  "모델 설명",
  "모델 설명",
  "Model explanation"
 ],
 [
  "닫기",
  "닫기",
  "Close"
 ],
 [
  "이 웹앱은 JavaScript가 필요합니다. 스크립트를 허용한 브라우저에서 열어 주세요.",
  "이 웹앱은 JavaScript가 필요합니다. 스크립트를 허용한 브라우저에서 열어 주세요.",
  "This app requires JavaScript. Open it in a browser with scripting enabled."
 ],
 [
  "읽기",
  "읽기",
  "Read"
 ],
 [
  "쓰기",
  "쓰기",
  "Write"
 ],
 [
  "리프레시",
  "리프레시",
  "Refresh"
 ],
 [
  "행 닫기",
  "행 닫기",
  "Close row"
 ],
 [
  "블록 소거",
  "블록 소거",
  "Erase block"
 ],
 [
  "한 WL의 8개 셀 표본입니다. MLC 이상은 여러 논리 페이지의 상태를 함께 표현합니다.",
  "한 WL의 8개 셀 · 다중 비트 상태 표본.",
  "Eight cells on one WL; multi-bit modes combine logical-page states."
 ],
 [
  "저장 정보의 유효성을 보장할 수 없습니다.",
  "저장 정보의 유효성을 보장할 수 없습니다.",
  "Stored data is not valid."
 ],
 [
  "제어 문자 포함",
  "제어 문자 포함",
  "contains control characters"
 ],
 [
  "단독 UTF-8 문자로 해석 불가",
  "단독 UTF-8 문자로 해석 불가",
  "not a complete UTF-8 sequence"
 ],
 [
  "8개 셀의 논리 상태입니다. 셀 선택은 관찰할 열을 바꾸며 데이터를 쓰지 않습니다.",
  "셀을 선택하면 해당 열을 관찰합니다.",
  "Select a cell to inspect its column."
 ],
 [
  "읽기는 출력 데이터, 쓰기는 모델 내부 검증 결과를 표시합니다.",
  "읽기 출력 / 쓰기 검증 결과.",
  "Read output / write verification."
 ],
 [
  "전하 상태는 전원 없이도 유지됩니다. 보존 기간은 무한하지 않습니다.",
  "비휘발성 저장 · 보존 기간은 유한.",
  "Non-volatile state; finite retention."
 ],
 [
  "전원 OFF · 셀 문턱 상태 유지 · 버퍼와 I/O는 정지",
  "전원 OFF · 셀 문턱 상태 유지 · 버퍼와 I/O는 정지",
  "Power OFF · thresholds retained · I/O stopped"
 ],
 [
  "전원에 의존하는 저장 상태입니다. 전원을 꺼서 차이를 확인하세요.",
  "유효한 데이터 유지에 전원이 필요합니다.",
  "Requires power to retain valid data."
 ],
 [
  "전원 OFF · X는 유효성 보장 종료를 뜻하며, 즉각적인 물리 방전을 뜻하지 않습니다.",
  "전원 OFF · X는 데이터 유효성 상실.",
  "Power OFF · X means invalid data, not instant discharge."
 ],
 [
  "한 블록의 WL / 스트링 표본",
  "한 블록의 WL / 스트링 표본",
  "Word lines / strings in one block"
 ],
 [
  "행·열 주소로 선택하는 셀 배열",
  "행·열 주소로 선택하는 셀 배열",
  "Addressed cell array"
 ],
 [
  "프로그램은 선택 페이지 표본에, 소거는 이 블록 전체에 적용됩니다.",
  "프로그램은 페이지 표본, 소거는 블록 전체.",
  "Program a page sample; erase the whole block."
 ],
 [
  "행을 바꾸어 다시 읽으면 행 적중과 새 행 접근의 차이를 확인할 수 있습니다.",
  "행과 열을 선택해 저장 상태를 확인하세요.",
  "Select a row and column to inspect its state."
 ],
 [
  "셀 상태는 남고, I/O는 멈춥니다.",
  "셀 상태는 남고, I/O는 멈춥니다.",
  "State retained; I/O stopped."
 ],
 [
  "저장 데이터의 유효성이 사라졌습니다.",
  "저장 데이터의 유효성이 사라졌습니다.",
  "Stored data is no longer valid."
 ],
 [
  "비휘발성 저장층의 상태는 유지되지만 전원이 없는 회로는 읽기·쓰기를 수행할 수 없습니다.",
  "비휘발성 저장층의 상태는 유지되지만 전원이 없는 회로는 읽기·쓰기를 수행할 수 없습니다.",
  "The non-volatile layer retains its state, but unpowered circuits cannot read or write."
 ],
 [
  "다시 전원을 켜도 이전 데이터가 자동 복원되지 않습니다. X는 논리 데이터가 정의되지 않았다는 의미입니다.",
  "다시 전원을 켜도 이전 데이터가 자동 복원되지 않습니다. X는 논리 데이터가 정의되지 않았다는 의미입니다.",
  "Powering on does not recover the old data. X means that the logical value is undefined."
 ],
 [
  "전원 OFF · 읽기 바이어스가 없어 전류를 감지하지 않습니다.",
  "전원 OFF · 읽기 바이어스가 없어 전류를 감지하지 않습니다.",
  "Power OFF · no read bias or sensing"
 ],
 [
  "먼저 전원을 켜세요.",
  "먼저 전원을 켜세요.",
  "Turn on power first."
 ],
 [
  "입력 변경으로 미완료 쓰기를 취소했습니다. 새 값으로 쓰기를 선택하세요.",
  "입력 변경으로 미완료 쓰기를 취소했습니다. 새 값으로 쓰기를 선택하세요.",
  "The input change canceled the unfinished write. Select Write to use the new data."
 ],
 [
  "변환할 문자를 입력하세요.",
  "변환할 문자를 입력하세요.",
  "Enter text to encode."
 ],
 [
  "셀당 비트 형식이 바뀌어 현재 메모리 유형을 초기화했습니다.",
  "셀당 비트 형식이 바뀌어 현재 메모리 유형을 초기화했습니다.",
  "Changing bits per cell reset this memory type."
 ],
 [
  "WebGL 장면이 없습니다.",
  "WebGL 장면이 없습니다.",
  "No 3D scene is available."
 ],
 [
  "3D 장면 PNG를 저장했습니다. HTML 주석은 포함되지 않습니다.",
  "3D 장면 PNG를 저장했습니다. HTML 주석은 포함되지 않습니다.",
  "Saved the 3D scene as PNG. HTML labels are not included."
 ],
 [
  "이 브라우저 환경은 전체 화면을 허용하지 않습니다.",
  "이 브라우저 환경은 전체 화면을 허용하지 않습니다.",
  "Fullscreen is not permitted in this browser."
 ],
 [
  "현재 모델 상태를 JSON으로 저장했습니다.",
  "현재 모델 상태를 JSON으로 저장했습니다.",
  "Saved the current model state as JSON."
 ],
 [
  "전원이 꺼져 있습니다.",
  "전원이 꺼져 있습니다.",
  "Power is off."
 ],
 [
  "전원이 꺼져 있습니다. 전원을 켠 뒤 실행하세요.",
  "전원이 꺼져 있습니다. 전원을 켠 뒤 실행하세요.",
  "Power is off. Turn it on before running an operation."
 ],
 [
  "이미 프로그램된 페이지입니다. 블록을 지우거나 다른 페이지를 선택하세요. 이 모델은 부분 페이지 재프로그램을 허용하지 않습니다.",
  "이미 프로그램된 페이지입니다. 블록을 지우거나 다른 페이지를 선택하세요. 이 모델은 부분 페이지 재프로그램을 허용하지 않습니다.",
  "This page is already programmed. Erase its block or select another page; this model does not allow partial-page reprogramming."
 ],
 [
  "문턱 전압을 낮추는 덮어쓰기는 허용되지 않습니다. 먼저 블록을 지우세요.",
  "문턱 전압을 낮추는 덮어쓰기는 허용되지 않습니다. 먼저 블록을 지우세요.",
  "An overwrite cannot reduce the threshold. Erase the block first."
 ],
 [
  "신호 또는 문턱 전압 그래프",
  "신호 또는 문턱 전압 그래프",
  "Signal or threshold-voltage chart"
 ],
 [
  "REVEALING ANATOMY",
  "반도체 메모리",
  "REVEALING ANATOMY"
 ],
 [
  "OF MEMORY",
  "내부 구조 탐색",
  "OF MEMORY"
 ],
 [
  "EXPLORE THE MEMORY",
  "메모리 선택",
  "MEMORY TYPES"
 ],
 [
  "STORAGE PRINCIPLE",
  "저장 원리",
  "STORAGE PRINCIPLE"
 ],
 [
  "INTERACTIVE ATLAS",
  "메모리 탐색",
  "INTERACTIVE ATLAS"
 ],
 [
  "MEMORY OPERATIONS",
  "메모리 동작",
  "MEMORY OPERATIONS"
 ],
 [
  "EXPLORE",
  "탐색",
  "EXPLORE"
 ],
 [
  "VOLATILE",
  "휘발성",
  "VOLATILE"
 ],
 [
  "NON-VOLATILE",
  "비휘발성",
  "NON-VOLATILE"
 ],
 [
  "LIVE INSPECTOR",
  "동작 분석",
  "LIVE INSPECTOR"
 ],
 [
  "SELECTED STRUCTURE",
  "선택한 구조",
  "SELECTED STRUCTURE"
 ],
 [
  "SIGNAL TIMING",
  "신호 파형",
  "SIGNAL TIMING"
 ],
 [
  "THRESHOLD DISTRIBUTION",
  "문턱 전압 분포",
  "THRESHOLD DISTRIBUTION"
 ],
 [
  "01 / DATA INPUT",
  "01 / 데이터 입력",
  "01 / DATA INPUT"
 ],
 [
  "02 / STORED STATE",
  "02 / 저장 상태",
  "02 / STORED STATE"
 ],
 [
  "03 / READOUT",
  "03 / 출력 결과",
  "03 / READOUT"
 ],
 [
  "THE UNDERLYING PRINCIPLE",
  "저장 원리",
  "STORAGE PRINCIPLE"
 ],
 [
  "WHAT THE BITS MEAN",
  "데이터의 의미",
  "WHAT THE BITS MEAN"
 ],
 [
  "MODEL BOUNDARY",
  "모델 범위",
  "MODEL BOUNDARY"
 ],
 [
  "CELL VOLTAGE",
  "셀 전압",
  "CELL VOLTAGE"
 ],
 [
  "BIT LINE",
  "비트라인",
  "BIT LINE"
 ],
 [
  "WORD LINE",
  "워드라인",
  "WORD LINE"
 ],
 [
  "STORED BIT",
  "저장 비트",
  "STORED BIT"
 ],
 [
  "STORAGE NODE Q",
  "저장 노드 Q",
  "STORAGE NODE Q"
 ],
 [
  "COMPLEMENT Q̅",
  "상보 노드 Q̅",
  "COMPLEMENT Q̅"
 ],
 [
  "CELL STATE",
  "셀 상태",
  "CELL STATE"
 ],
 [
  "Vt · NORMALIZED",
  "Vt · 정규화",
  "Vt · NORMALIZED"
 ],
 [
  "BITS / CELL",
  "셀당 비트",
  "BITS / CELL"
 ],
 [
  "BLOCK ERASES",
  "블록 소거 횟수",
  "BLOCK ERASES"
 ],
 [
  "ROW OPEN",
  "행 열림",
  "ROW OPEN"
 ],
 [
  "ROW CLOSED",
  "행 닫힘",
  "ROW CLOSED"
 ],
 [
  "PROGRAMMED",
  "기록됨",
  "PROGRAMMED"
 ],
 [
  "ERASED",
  "소거됨",
  "ERASED"
 ],
 [
  "LATCH HELD",
  "래치 유지",
  "LATCH HELD"
 ],
 [
  "NOT LATCHED",
  "출력 대기",
  "NOT LATCHED"
 ],
 [
  "WRITE VERIFIED",
  "쓰기 확인",
  "WRITE VERIFIED"
 ],
 [
  "DATA LATCHED",
  "출력 준비",
  "DATA LATCHED"
 ],
 [
  "POWER OFF",
  "전원 꺼짐",
  "POWER OFF"
 ],
 [
  "UNDEFINED",
  "미정의",
  "UNDEFINED"
 ],
 [
  "OPERATION COMPLETE",
  "동작 완료",
  "OPERATION COMPLETE"
 ],
 [
  "STEP MODE",
  "단계 탐색",
  "STEP MODE"
 ],
 [
  "RUNNING",
  "재생 중",
  "RUNNING"
 ],
 [
  "8-BIT WORD",
  "8비트 워드",
  "8-BIT WORD"
 ],
 [
  "BANK",
  "뱅크",
  "BANK"
 ],
 [
  "BLOCK",
  "블록",
  "BLOCK"
 ],
 [
  "ROW",
  "행",
  "ROW"
 ],
 [
  "COL",
  "열",
  "COL"
 ],
 [
  "액세스 MOS",
  "액세스 MOS",
  "Access MOS"
 ],
 [
  "워드라인 WL",
  "워드라인 WL",
  "Word line WL"
 ],
 [
  "공통 플레이트 · VDD/2",
  "공통 플레이트 · VDD/2",
  "Plate · VDD/2"
 ],
 [
  "저장 전극 · 전하 Q",
  "저장 전극 · 전하 Q",
  "Storage node · Q"
 ],
 [
  "액세스 트랜지스터",
  "액세스 트랜지스터",
  "Access transistor"
 ],
 [
  "매몰 워드라인 WL",
  "매몰 워드라인 WL",
  "Buried WL"
 ],
 [
  "비트라인 BL",
  "비트라인 BL",
  "Bit line BL"
 ],
 [
  "가속기 · 연산 로직",
  "가속기 · 연산 로직",
  "Accelerator"
 ],
 [
  "3D NAND 다이 × 8",
  "3D NAND 다이 × 8",
  "3D NAND dies × 8"
 ],
 [
  "DRAM 다이 × 8",
  "DRAM 다이 × 8",
  "DRAM dies × 8"
 ],
 [
  "독립 서브어레이",
  "독립 서브어레이",
  "Parallel subarrays"
 ],
 [
  "뱅크 · 셀 배열",
  "뱅크 · 셀 배열",
  "Banks / arrays"
 ],
 [
  "TSV · 수직 연결",
  "TSV · 수직 연결",
  "TSV connections"
 ],
 [
  "페이지 버퍼 · 제어 로직",
  "페이지 버퍼 · 제어 로직",
  "Buffers / control"
 ],
 [
  "베이스 다이 · I/O",
  "베이스 다이 · I/O",
  "Base die / I/O"
 ],
 [
  "인터포저 · 병렬 데이터 경로",
  "인터포저 · 병렬 데이터 경로",
  "Interposer"
 ],
 [
  "NAND 배열 / CMOS 분리",
  "NAND 배열 / CMOS 분리",
  "NAND array / CMOS"
 ],
 [
  "전하 트랩 · 질화막",
  "전하 트랩 · 질화막",
  "Charge trap"
 ],
 [
  "수직 반도체 채널",
  "수직 반도체 채널",
  "Vertical channel"
 ],
 [
  "페이지 버퍼 / 센싱",
  "페이지 버퍼 / 센싱",
  "Page buffer / sense"
 ],
 [
  "소프트웨어 3D",
  "소프트웨어 3D",
  "Software 3D"
 ],
 [
  "읽기·쓰기·소거 상태와 회로 확대 위치는 언어를 바꿔도 유지됩니다.",
  "읽기·쓰기·소거 상태와 회로 확대 위치는 언어를 바꿔도 유지됩니다.",
  "Changing language preserves data, operation state and circuit position."
 ],
 [
  "확대 / 축소",
  "확대 / 축소",
  "Zoom in / out"
 ],
 [
  "기본 시점으로",
  "기본 시점으로",
  "Reset current view"
 ],
 [
  "화면 복귀",
  "화면 복귀",
  "Exit expanded view"
 ],
 [
  "단계별 정규화 전압 · 실제 시간 비율 아님",
  "단계별 정규화 전압 · 실제 시간 비율 아님",
  "Normalized voltage by stage; not physical timing"
 ],
 [
  "예시 문턱 분포와 Gray 매핑 · 실측 분포 아님",
  "예시 문턱 분포와 Gray 매핑 · 실측 분포 아님",
  "Illustrative thresholds and Gray mapping; not measured distributions"
 ],
 [
  "각 동작 단계에 따른 워드라인·비트라인·저장 노드의 예시 신호 파형",
  "각 동작 단계에 따른 워드라인·비트라인·저장 노드의 예시 신호 파형",
  "Illustrative word-line, bit-line and storage-node signals by operation stage"
 ],
 [
  "1T1C DRAM · 전하 공유, 감지, 복원",
  "1T1C DRAM · 전하 공유, 감지, 복원",
  "1T1C DRAM: charge sharing, sensing and restoration"
 ],
 [
  "6T SRAM · 교차 결합 인버터와 두 액세스 게이트",
  "6T SRAM · 교차 결합 인버터와 두 액세스 게이트",
  "6T SRAM: cross-coupled inverters and two access gates"
 ],
 [
  "NAND 직렬 스트링 · 선택 WL과 통과 바이어스",
  "NAND 직렬 스트링 · 선택 WL과 통과 바이어스",
  "NAND string: selected word line and pass bias"
 ],
 [
  "적층 메모리의 논리 데이터 경로",
  "적층 메모리의 논리 데이터 경로",
  "Logical data paths in stacked memory"
 ],
 [
  "6개 트랜지스터로 구성한 SRAM 회로. 4개는 교차 결합 인버터, 2개는 접근 NMOS입니다.",
  "6개 트랜지스터로 구성한 SRAM 회로. 4개는 교차 결합 인버터, 2개는 접근 NMOS입니다.",
  "SRAM circuit with six transistors: four form the cross-coupled inverters; two are access NMOS devices."
 ],
 [
  "DRAM 1T1C 회로. 워드라인으로 트랜지스터를 켜면 저장 커패시터와 비트라인이 연결됩니다.",
  "DRAM 1T1C 회로. 워드라인으로 트랜지스터를 켜면 저장 커패시터와 비트라인이 연결됩니다.",
  "DRAM 1T1C circuit. The word line enables the transistor connecting the storage capacitor to the bit line."
 ],
 [
  "직렬 NAND 스트링의 선택 워드라인에 읽기 기준을 걸고 나머지 셀을 통과시켜 전류를 감지합니다.",
  "직렬 NAND 스트링의 선택 워드라인에 읽기 기준을 걸고 나머지 셀을 통과시켜 전류를 감지합니다.",
  "NAND string: apply a read reference to the selected WL, pass the remaining cells, then sense current."
 ],
 [
  "저장 커패시터",
  "저장 커패시터",
  "Storage capacitor"
 ],
 [
  "기생 용량",
  "기생 용량",
  "Parasitic C"
 ],
 [
  "열 선택",
  "열 선택",
  "Column select"
 ],
 [
  "4T 래치 + 2T 액세스",
  "4T 래치 + 2T 액세스",
  "4T latch + 2T access"
 ],
 [
  "감지 → 복원",
  "감지 → 복원",
  "Sense → restore"
 ],
 [
  "예시 Cc:Cb = 1:10",
  "예시 Cc:Cb = 1:10",
  "Example Cc:Cb = 1:10"
 ],
 [
  "선택 셀에서 스트링 전류를 판정합니다.",
  "선택 셀에서 스트링 전류를 판정합니다.",
  "The selected cell controls string current."
 ],
 [
  "선택 WL: Vref · 비선택 WL: Vpass",
  "선택 WL: Vref · 비선택 WL: Vpass",
  "Selected WL: Vref · other WLs: Vpass"
 ],
 [
  "전하 트랩 → Vt",
  "전하 트랩 → Vt",
  "Charge trap → Vt"
 ],
 [
  "읽기: Vref 비교",
  "읽기: Vref 비교",
  "Read: compare Vref"
 ],
 [
  "쓰기: Vt 증가",
  "쓰기: Vt 증가",
  "Program: raise Vt"
 ],
 [
  "소거: 블록 초기화",
  "소거: 블록 초기화",
  "Erase: reset block"
 ],
 [
  "버퍼 · 제어",
  "버퍼 · 제어",
  "Buffer / control"
 ],
 [
  "병렬 전송",
  "병렬 전송",
  "Parallel transfer"
 ],
 [
  "독립 뱅크 + 병렬 전송",
  "독립 뱅크 + 병렬 전송",
  "Independent banks + parallel transfer"
 ],
 [
  "ECC 위치 표시 · 연산은 미구현",
  "ECC 위치 표시 · 연산은 미구현",
  "ECC location only; no ECC computation"
 ],
 [
  "가속기 / HOST",
  "가속기 / HOST",
  "Accelerator / host"
 ],
 [
  "구조 기반 교육 모델입니다.",
  "구조 기반 교육 모델입니다.",
  "A structure-based educational model."
 ],
 [
  "3D 형상·색상·층수·배선 수·시간축은 구분과 학습을 위한 표현입니다. SPICE / TCAD / 실제 메모리 컨트롤러 시뮬레이션이 아닙니다.",
  "3D 형상·색상·층수·배선 수·시간축은 구분과 학습을 위한 표현입니다. SPICE / TCAD / 실제 메모리 컨트롤러 시뮬레이션이 아닙니다.",
  "The geometry, colors, layer counts, path counts and time axis distinguish functions for learning. This is not SPICE, TCAD or a real memory-controller simulation."
 ],
 [
  "확인일:",
  "확인일:",
  "Original review date:"
 ],
 [
  "RAM 참조 리비전:",
  "RAM 참조 리비전:",
  "Pinned RAM revision:"
 ],
 [
  "이 앱은 제조 공정·식각 장비·시장 가격을 모델링하지 않습니다.",
  "이 앱은 제조 공정·식각 장비·시장 가격을 모델링하지 않습니다.",
  "This app does not model manufacturing, etching equipment or market prices."
 ],
 [
  "이 화면의 근거 자료",
  "이 화면의 근거 자료",
  "Sources for this view"
 ],
 [
  "JTech-CO / RAM · 참고 저장소 ↗",
  "JTech-CO / RAM · 참고 저장소 ↗",
  "JTech-CO / RAM · reference repository ↗"
 ],
 [
  "계산과 단순화",
  "계산과 단순화",
  "Calculations and simplifications"
 ],
 [
  "SRAM: 이상적인 안정 상태 전이이며 소자 비율과 read disturb는 계산하지 않습니다. DRAM: 전하 공유는 전하 보존식, 누설은 V(t)=0.5+(V₀−0.5)e^(−t/40ms)로 계산하는 예시입니다. |V−0.5| < 0.035 V에서는 X로 표시합니다. 실제 리텐션·불량률을 예측하는 값이 아닙니다.",
  "SRAM: 이상적인 안정 상태 전이이며 소자 비율과 read disturb는 계산하지 않습니다. DRAM: 전하 공유는 전하 보존식, 누설은 V(t)=0.5+(V₀−0.5)e^(−t/40ms)로 계산하는 예시입니다. |V−0.5| < 0.035 V에서는 X로 표시합니다. 실제 리텐션·불량률을 예측하는 값이 아닙니다.",
  "SRAM uses ideal stable-state transitions; transistor sizing and read disturb are not calculated. DRAM charge sharing follows charge conservation. Illustrative leakage uses V(t)=0.5+(V₀−0.5)e^(−t/40ms), with X when |V−0.5| < 0.035 V. These values do not predict actual retention or failure rates."
 ],
 [
  "NAND/HBF: 8×8 셀은 물리 페이지·블록의 축소 표본입니다. 문턱 순서, 읽기 비교, 프로그램 및 블록 소거 제약만 실행합니다. Gray 매핑·분포 폭은 예시이고 ECC·FTL·마모 분산·제품별 ISPP는 구현하지 않았습니다. 비휘발성은 무한 보존을 의미하지 않습니다.",
  "NAND/HBF: 8×8 셀은 물리 페이지·블록의 축소 표본입니다. 문턱 순서, 읽기 비교, 프로그램 및 블록 소거 제약만 실행합니다. Gray 매핑·분포 폭은 예시이고 ECC·FTL·마모 분산·제품별 ISPP는 구현하지 않았습니다. 비휘발성은 무한 보존을 의미하지 않습니다.",
  "NAND/HBF use 8×8 cell samples of physical pages and blocks. The model enforces threshold ordering, sensing comparisons and program/block-erase constraints. Gray mapping and distribution widths are examples; actual ECC, FTL, wear leveling and product-specific ISPP are not implemented. Non-volatile does not mean infinite retention."
 ],
 [
  "미완료 연산 중 종류·주소를 바꾸면 그 연산은 취소됩니다. 이전 단계로 돌아가면 이번 연산의 시작 상태부터 재연산합니다. 브라우저 새로고침은 교육용 초기 상태를 불러옵니다.",
  "미완료 연산 중 종류·주소를 바꾸면 그 연산은 취소됩니다. 이전 단계로 돌아가면 이번 연산의 시작 상태부터 재연산합니다. 브라우저 새로고침은 교육용 초기 상태를 불러옵니다.",
  "Changing memory type or address cancels an unfinished operation. Stepping backward reconstructs the current operation from its starting state. Reloading the page restores the teaching defaults; only the language preference is remembered."
 ],
 [
  "RAM Lab 사용법",
  "RAM Lab 사용법",
  "RAM Lab guide"
 ],
 [
  "왼쪽에서 메모리를 선택하고",
  "왼쪽에서 메모리를 선택하고",
  "Choose a memory and explore"
 ],
 [
  "3D 구조 → 회로 보기 → 셀 배열",
  "3D 구조 → 회로 보기 → 셀 배열",
  "3D structure → circuit → cell array"
 ],
 [
  "을 오가며 같은 저장 상태를 관찰하세요.",
  "을 오가며 같은 저장 상태를 관찰하세요.",
  "to observe the same stored state."
 ],
 [
  "첫 번째 실험 · DRAM 읽기",
  "첫 번째 실험 · DRAM 읽기",
  "Experiment 1 · DRAM read"
 ],
 [
  "‘읽기’를 선택한 뒤 ‘다음’을 눌러 프리차지, ACT, 전하 공유, 감지, 복원, 출력을 확인하세요. 읽기가 끝나면 행이 열린 상태입니다. 같은 행에서 ‘읽기’를 다시 선택하면 ROW HIT 경로가 나타납니다.",
  "‘읽기’를 선택한 뒤 ‘다음’을 눌러 프리차지, ACT, 전하 공유, 감지, 복원, 출력을 확인하세요. 읽기가 끝나면 행이 열린 상태입니다. 같은 행에서 ‘읽기’를 다시 선택하면 ROW HIT 경로가 나타납니다.",
  "Select Read, then press Next to inspect precharge, ACT, charge sharing, sensing, restoration and output. After completion the row remains open. Select Read again on the same row to follow the ROW HIT path."
 ],
 [
  "두 번째 실험 · 다른 데이터를 저장",
  "두 번째 실험 · 다른 데이터를 저장",
  "Experiment 2 · Store different data"
 ],
 [
  "DATA INPUT에 16진수를 입력합니다. ‘쓰기’를 선택하고 끝까지 재생하면 실제 모델 상태가 바뀝니다. ‘UTF-8 → HEX’는 선택한 워드가 담을 수 있는 첫 바이트들을 사용하며 나머지는 알림으로 명시합니다.",
  "DATA INPUT에 16진수를 입력합니다. ‘쓰기’를 선택하고 끝까지 재생하면 실제 모델 상태가 바뀝니다. ‘UTF-8 → HEX’는 선택한 워드가 담을 수 있는 첫 바이트들을 사용하며 나머지는 알림으로 명시합니다.",
  "Enter hexadecimal data in Data input. Select Write and finish the operation to change the model state. UTF-8 → HEX loads the first bytes that fit in the selected word; a notice identifies any bytes that do not fit."
 ],
 [
  "세 번째 실험 · 전원과 누설",
  "세 번째 실험 · 전원과 누설",
  "Experiment 3 · Power and leakage"
 ],
 [
  "전원 OFF는 SRAM·DRAM·HBM의 데이터를 X로, NAND·HBF는 문턱 상태를 그대로 표시합니다. 실제 즉시 방전을 뜻하지 않습니다. DRAM에서는 자동 리프레시를 끄고 가상 시간을 늘려 읽기 마진이 작아지는 모습을 비교하세요.",
  "전원 OFF는 SRAM·DRAM·HBM의 데이터를 X로, NAND·HBF는 문턱 상태를 그대로 표시합니다. 실제 즉시 방전을 뜻하지 않습니다. DRAM에서는 자동 리프레시를 끄고 가상 시간을 늘려 읽기 마진이 작아지는 모습을 비교하세요.",
  "Power OFF marks SRAM, DRAM and HBM data as X while NAND and HBF retain their threshold states. This is not a claim of instant physical discharge. In DRAM, disable auto-refresh and advance virtual time to observe reduced sensing margin."
 ],
 [
  "네 번째 실험 · NAND 페이지와 블록",
  "네 번째 실험 · NAND 페이지와 블록",
  "Experiment 4 · NAND pages and blocks"
 ],
 [
  "TLC·QLC를 선택하면 셀당 상태 수와 표현 비트가 함께 바뀝니다. 이 변경은 현재 메모리 유형을 초기화합니다. 페이지를 한 번 기록한 뒤 다시 쓰면 차단됩니다. ‘블록 소거’를 끝까지 실행하면 블록의 모든 셀이 E로 돌아옵니다.",
  "TLC·QLC를 선택하면 셀당 상태 수와 표현 비트가 함께 바뀝니다. 이 변경은 현재 메모리 유형을 초기화합니다. 페이지를 한 번 기록한 뒤 다시 쓰면 차단됩니다. ‘블록 소거’를 끝까지 실행하면 블록의 모든 셀이 E로 돌아옵니다.",
  "TLC and QLC change the number of states and bits per cell, resetting the current memory type. Reprogramming a written page is blocked. Complete Erase block to return all cells in that block to E."
 ],
 [
  "재생 / 일시 정지",
  "재생 / 일시 정지",
  "Play / pause"
 ],
 [
  "이전 / 다음 단계",
  "이전 / 다음 단계",
  "Previous / next stage"
 ],
 [
  "3D 시점 초기화",
  "3D 시점 초기화",
  "Reset 3D view"
 ],
 [
  "사용법",
  "사용법",
  "Help"
 ],
 [
  "카메라 이동",
  "카메라 이동",
  "Pan camera"
 ],
 [
  "‘분해’는 모델의 전극·배선 또는 다이 간격을 벌립니다. ‘관찰 다이’는 시각적 관찰만, BANK/ROW/COL은 시뮬레이션의 실제 표본 주소를 바꿉니다. 광점은 전자 궤적이 아닌 진행 방향 표시입니다.",
  "‘분해’는 모델의 전극·배선 또는 다이 간격을 벌립니다. ‘관찰 다이’는 시각적 관찰만, BANK/ROW/COL은 시뮬레이션의 실제 표본 주소를 바꿉니다. 광점은 전자 궤적이 아닌 진행 방향 표시입니다.",
  "Explode separates electrodes, wires or dies. View die only changes the inspected layer; BANK/ROW/COL select actual sampled addresses in the simulation. Light particles show progress, not electron trajectories."
 ],
 [
  "외부 계정·서버·분석 서비스로 데이터를 전송하지 않습니다. 모든 동작은 브라우저 안에서 수행됩니다. 출처 링크는 별도 탭에서 열립니다.",
  "외부 계정·서버·분석 서비스로 데이터를 전송하지 않습니다. 모든 동작은 브라우저 안에서 수행됩니다. 출처 링크는 별도 탭에서 열립니다.",
  "No data is sent to an external account, server or analytics service. All operations run in the browser. Source links open in a separate tab. Only your language preference is saved locally."
 ],
 [
  "같은 비트, 서로 다른 저장 방식",
  "같은 비트, 서로 다른 저장 방식",
  "The same bits, different storage"
 ],
 [
  "HBM과 DRAM은 같은 저장 원리를, HBF와 NAND도 같은 계열의 저장 원리를 공유합니다. 대역폭·지연·용량·접근 단위를 한 줄의 속도 순서로 합치지 않습니다.",
  "HBM과 DRAM은 같은 저장 원리를, HBF와 NAND도 같은 계열의 저장 원리를 공유합니다. 대역폭·지연·용량·접근 단위를 한 줄의 속도 순서로 합치지 않습니다.",
  "HBM and DRAM share a storage principle, as do HBF and NAND. Bandwidth, latency, capacity and access granularity should not be collapsed into a single speed ranking."
 ],
 [
  "종류",
  "종류",
  "Type"
 ],
 [
  "셀의 물리적 상태",
  "셀의 물리적 상태",
  "Physical state"
 ],
 [
  "쓰기 / 소거",
  "쓰기 / 소거",
  "Write / erase"
 ],
 [
  "전원",
  "전원",
  "Power"
 ],
 [
  "6T 래치의 상보 논리 전압",
  "6T 래치의 상보 논리 전압",
  "Complementary voltages in a 6T latch"
 ],
 [
  "비트라인 차동 감지",
  "비트라인 차동 감지",
  "Differential bit-line sensing"
 ],
 [
  "래치 상태 전환",
  "래치 상태 전환",
  "Switch the latch state"
 ],
 [
  "필요",
  "필요",
  "Required"
 ],
 [
  "1T1C 저장 노드 전압",
  "1T1C 저장 노드 전압",
  "1T1C storage-node voltage"
 ],
 [
  "전하 공유 → 감지 → 복원",
  "전하 공유 → 감지 → 복원",
  "Charge share → sense → restore"
 ],
 [
  "열린 행의 전압 구동",
  "열린 행의 전압 구동",
  "Drive voltage into an open row"
 ],
 [
  "전원 + 리프레시",
  "전원 + 리프레시",
  "Power + refresh"
 ],
 [
  "적층 DRAM의 1T1C",
  "적층 DRAM의 1T1C",
  "1T1C cells in stacked DRAM"
 ],
 [
  "DRAM 접근 + 넓은 병렬 전송",
  "DRAM 접근 + 넓은 병렬 전송",
  "DRAM access + parallel transfer"
 ],
 [
  "DRAM과 동일한 셀 동작",
  "DRAM과 동일한 셀 동작",
  "The same DRAM cell operation"
 ],
 [
  "NAND 전하 저장층",
  "NAND 전하 저장층",
  "NAND charge storage"
 ],
 [
  "NAND 센싱 + 병렬 데이터 경로",
  "NAND 센싱 + 병렬 데이터 경로",
  "NAND sensing + parallel paths"
 ],
 [
  "프로그램 / 블록 소거. 호스트 제약은 구현별",
  "프로그램 / 블록 소거. 호스트 제약은 구현별",
  "Program / block erase; host constraints depend on implementation"
 ],
 [
  "비휘발성*",
  "비휘발성*",
  "Non-volatile*"
 ],
 [
  "트랩 전하에 따른 Vt",
  "트랩 전하에 따른 Vt",
  "Vt set by trapped charge"
 ],
 [
  "기준 바이어스와 전류 비교",
  "기준 바이어스와 전류 비교",
  "Reference-bias / current comparison"
 ],
 [
  "페이지 프로그램 / 블록 소거",
  "페이지 프로그램 / 블록 소거",
  "Page program / block erase"
 ],
 [
  "* 보존 기간·내구성은 유한하며 환경과 제품에 의존합니다. HBF의 보존 요구를 장기 저장용 SSD와 같다고 가정하지 않습니다.",
  "* 보존 기간·내구성은 유한하며 환경과 제품에 의존합니다. HBF의 보존 요구를 장기 저장용 SSD와 같다고 가정하지 않습니다.",
  "* Retention and endurance are finite and depend on the device and environment. HBF retention requirements must not be assumed equivalent to those of an SSD for long-term storage."
 ],
 [
  "이 앱의 공통 실험 단위",
  "이 앱의 공통 실험 단위",
  "Common experimental sample"
 ],
 [
  "휘발성 셀은 8×8비트 표본, NAND 계열은 8개 WL × 8개 스트링 표본을 사용합니다. 이는 비교를 위한 크기이며 실제 워드·페이지·블록·뱅크 크기를 뜻하지 않습니다.",
  "휘발성 셀은 8×8비트 표본, NAND 계열은 8개 WL × 8개 스트링 표본을 사용합니다. 이는 비교를 위한 크기이며 실제 워드·페이지·블록·뱅크 크기를 뜻하지 않습니다.",
  "Volatile memory uses 8×8-bit samples. NAND-based memory uses eight word lines and eight sampled strings. These dimensions support comparison; they are not real word, page, block or bank sizes."
 ],
 [
  "RAM 원문 및 각 장의 출처 ↗",
  "RAM 원문 및 각 장의 출처 ↗",
  "RAM chapters and their original references ↗"
 ],
 [
  "메모리를 고르고 3D 구조·회로·셀 배열에서 같은 데이터를 관찰하세요.",
  "메모리를 고르고 3D 구조·회로·셀 배열에서 같은 데이터를 관찰하세요.",
  "Choose a memory and observe the same data in 3D structure, Circuit and Cell array."
 ],
 [
  "회로 확대와 모바일 조작",
  "회로 확대와 모바일 조작",
  "Circuit zoom and touch controls"
 ],
 [
  "회로에서는 +/− 버튼, 휠 또는 두 손가락 핀치로 확대하고 드래그로 이동합니다. ‘전체 보기’는 회로 전체를 맞추고, ‘기본 배율’은 글자를 읽기 좋은 크기로 되돌립니다. 좁은 화면의 기본 회로는 100% 배율이며 좌우로 이동해 봅니다.",
  "회로에서는 +/− 버튼, 휠 또는 두 손가락 핀치로 확대하고 드래그로 이동합니다. ‘전체 보기’는 회로 전체를 맞추고, ‘기본 배율’은 글자를 읽기 좋은 크기로 되돌립니다. 좁은 화면의 기본 회로는 100% 배율이며 좌우로 이동해 봅니다.",
  "In Circuit, use the +/− buttons, wheel or a two-finger pinch to zoom; drag to pan. Fit shows the entire diagram. Reset restores a readable scale. On narrow screens the default is 100%; pan to inspect either side."
 ],
 [
  "언어는 상단의 KR/EN에서 바꿉니다. 입력값·메모리 상태·재생 단계·회로 확대 위치는 유지되며, 언어 선택만 브라우저에 저장됩니다. 상세 설명은 펼쳐 읽고, 작은 화면에서는 셀 배열과 비교표만 내부 스크롤로 탐색합니다.",
  "언어는 상단의 KR/EN에서 바꿉니다. 입력값·메모리 상태·재생 단계·회로 확대 위치는 유지되며, 언어 선택만 브라우저에 저장됩니다. 상세 설명은 펼쳐 읽고, 작은 화면에서는 셀 배열과 비교표만 내부 스크롤로 탐색합니다.",
  "Switch with KR/EN in the header. Inputs, stored data, operation stage and circuit position stay unchanged; only the language choice is remembered. Expand details to read more. On small screens, the cell array and comparison table scroll within their own panels."
 ],
 [
  "회로의 확대 / 전체 보기",
  "회로의 확대 / 전체 보기",
  "Circuit zoom / fit"
 ],
 [
  "회로의 기본 배율",
  "회로의 기본 배율",
  "Reset circuit scale"
 ],
 [
  "전체 화면 닫기",
  "전체 화면 닫기",
  "Exit expanded view"
 ]
];
R.flowLabels={
 "PRECHARGE": [
  "프리차지",
  "Precharge"
 ],
 "WORD LINE": [
  "셀 연결",
  "Connect"
 ],
 "BIT LINE": [
  "차동 형성",
  "Develop"
 ],
 "SENSE": [
  "감지",
  "Sense"
 ],
 "HOLD": [
  "상태 유지",
  "Hold"
 ],
 "DRIVE BL": [
  "쓰기 구동",
  "Drive"
 ],
 "ACCESS": [
  "접근",
  "Access"
 ],
 "FLIP": [
  "래치 전환",
  "Switch"
 ],
 "ISOLATE": [
  "분리",
  "Isolate"
 ],
 "WRITE DONE": [
  "쓰기 완료",
  "Written"
 ],
 "ACTIVATE": [
  "행 열기",
  "Activate"
 ],
 "CHARGE SHARE": [
  "전하 공유",
  "Share charge"
 ],
 "RESTORE": [
  "복원",
  "Restore"
 ],
 "COLUMN": [
  "출력",
  "Read out"
 ],
 "ROW HIT": [
  "행 적중",
  "Row hit"
 ],
 "WRITE": [
  "쓰기",
  "Write"
 ],
 "PRE": [
  "행 닫기",
  "Close row"
 ],
 "REF ACT": [
  "행 열기",
  "Activate"
 ],
 "REF SENSE": [
  "감지",
  "Sense"
 ],
 "REF RESTORE": [
  "복원",
  "Restore"
 ],
 "REF END": [
  "행 닫기",
  "Close row"
 ],
 "COMMAND": [
  "명령",
  "Command"
 ],
 "SENSE / RESTORE": [
  "감지·복원",
  "Sense / restore"
 ],
 "TSV BURST": [
  "수직 전송",
  "TSV burst"
 ],
 "PARALLEL I/O": [
  "병렬 출력",
  "Parallel out"
 ],
 "DATA IN": [
  "데이터 입력",
  "Data in"
 ],
 "TSV WRITE": [
  "수직 전달",
  "TSV write"
 ],
 "WRITE / RESTORE": [
  "쓰기·복원",
  "Write / restore"
 ],
 "REQUEST": [
  "요청",
  "Request"
 ],
 "ARRAY SELECT": [
  "배열 선택",
  "Select array"
 ],
 "NAND SENSE": [
  "문턱 감지",
  "Sense Vt"
 ],
 "PAGE BUFFER": [
  "버퍼 저장",
  "Buffer"
 ],
 "PARALLEL TRANSFER": [
  "병렬 전송",
  "Transfer"
 ],
 "COMPLETE": [
  "완료",
  "Complete"
 ],
 "DATA LOAD": [
  "데이터 적재",
  "Load data"
 ],
 "PROGRAM SETUP": [
  "바이어스",
  "Set bias"
 ],
 "ISPP PULSE": [
  "프로그램",
  "Program"
 ],
 "VERIFY": [
  "검증",
  "Verify"
 ],
 "PAGE COMMIT": [
  "기록 확정",
  "Commit"
 ],
 "READY": [
  "완료",
  "Ready"
 ],
 "ERASE SETUP": [
  "블록 선택",
  "Select block"
 ],
 "ERASE FIELD": [
  "소거",
  "Erase"
 ],
 "ERASE VERIFY": [
  "소거 검증",
  "Verify erase"
 ],
 "ERASE DONE": [
  "소거 완료",
  "Erased"
 ],
 "SELECT STRING": [
  "스트링 선택",
  "Select string"
 ],
 "PASS BIAS": [
  "통과 전압",
  "Pass bias"
 ],
 "VREF": [
  "기준 전압",
  "Read bias"
 ],
 "DATA OUT": [
  "출력",
  "Data out"
 ],
 "WRITE DRIVER": [
  "쓰기 구동",
  "Drive write"
 ],
 "WL HIGH": [
  "셀 연결",
  "Connect"
 ],
 "WL LOW": [
  "셀 분리",
  "Isolate"
 ],
 "LATCH FLIP": [
  "래치 전환",
  "Switch latch"
 ],
 "BITLINE Δ": [
  "차동 형성",
  "Develop Δ"
 ]
};
R.summaries={
 "SRAM": {
  "intro": "6T 래치가 전원이 켜진 동안 1비트를 유지합니다.",
  "data": "캐시와 레지스터의 정보를 0과 1로 저장합니다.",
  "model": "6T 대표 구조 · 소자 크기와 잡음 마진은 미계산."
 },
 "DRAM": {
  "intro": "전하를 나누어 읽고, 감지한 값을 다시 복원합니다.",
  "data": "행을 열고, 필요한 데이터를 행 버퍼에서 선택합니다.",
  "model": "대표 1T1C 구조 · 전압과 누설은 교육용 가정."
 },
 "HBM": {
  "intro": "DRAM 다이를 쌓고, 여러 경로로 데이터를 전송합니다.",
  "data": "텐서와 KV 캐시를 넓은 경로로 연속 공급합니다.",
  "model": "적층·연결 개념도 · 제품별 타이밍은 미계산."
 },
 "HBF": {
  "intro": "NAND 저장 원리에 높은 병렬성을 결합합니다.",
  "data": "모델 가중치처럼 용량과 읽기 대역폭이 중요한 데이터.",
  "model": "공개 구조 기반 개념도 · 특정 제품 에뮬레이터 아님."
 },
 "NAND": {
  "intro": "저장한 전하가 문턱 전압을 바꾸고, 그 상태를 읽습니다.",
  "data": "문턱 상태를 비트로 해석하고, 페이지 단위로 다룹니다.",
  "model": "CTF 대표 구조 · 실제 ECC·FTL은 구현하지 않음."
 }
};
})();
