# Sources and attribution

Review date: 2026-09-10. Reference revision: `a2c3cbd63b7058c0853e7197e22d660017d0087c`.

The application was independently implemented. It does not redistribute the reference repository, vendor images, product CAD, font files or third-party runtime libraries. General mechanisms are distinguished from product-calibrated parameters.

## 1. JTech-CO / RAM · 참고 저장소

Reference repository

https://github.com/JTech-CO/RAM/tree/a2c3cbd63b7058c0853e7197e22d660017d0087c

01–05장: 셀 구조, 데이터 접근 원리, 계층 구분. 특정 제품 수치와 공정 설명은 앱의 계산 모델에 사용하지 않았습니다.

## 2. 6T SRAM Cell

TU Wien · Robert Entner doctoral thesis

https://www.iue.tuwien.ac.at/phd/entner/node34.html

교차 결합 인버터, 액세스 트랜지스터, 보존·읽기·쓰기 원리.

## 3. DRAM: array, core and periphery

Applied Materials

https://www.appliedmaterials.com/us/en/semiconductor/markets-and-inflections/memory/dram.html

셀 배열, 센스 앰프·워드라인 디코더, 외부 I/O의 구분.

## 4. Shifting in-DRAM

Research paper · arXiv:2602.24269v1

https://arxiv.org/html/2602.24269v1

ACTIVATE, charge sharing, sense amplification, restore, READ/WRITE, PRECHARGE.

## 5. HBM · 1T1C / TSV / base die / interposer

RAM chapter 03 · pinned revision

https://github.com/JTech-CO/RAM/blob/a2c3cbd63b7058c0853e7197e22d660017d0087c/03-hbm.md

HBM을 새로운 저장 셀이 아니라 DRAM 기반의 적층·인터페이스 구조로 구분.

## 6. First HBF standard specifications at FMS 2026

SK hynix · 2026-08-04

https://news.skhynix.com/en/hbf-at-fms-2026/

Sandisk와의 HBF 공개 사양 발표 및 NAND 기반 고대역폭 메모리 구상. 발표 수치를 동작 보증값으로 재사용하지 않았습니다.

## 7. Inside High Bandwidth Flash for AI

Sandisk · 2025

https://www.sandisk.com/company/newsroom/blogs/2025/scaling-beyond-the-wall-inside-sandisks-high-bandwidth-flash-for-ai

NAND 기반 HBF와 AI 추론 활용 방향. 미공개 장치 내부 구현은 개념 모델로 한정.

## 8. What is NAND Flash Memory?

KIOXIA · Research & Development

https://www.kioxia.com/en-jp/rd/technology/nand-flash.html

절연층으로 둘러싸인 전하 저장층과 비휘발성 저장의 기본 원리.

## 9. Multi-level Cell Technology

KIOXIA · Research & Development

https://www.kioxia.com/en-jp/rd/technology/multi-level-cell.html

저장 전하·문턱 전압, 셀당 비트 수와 구분 가능한 상태 수.

## 10. Hole-Trapping in SiN Films

KIOXIA · 2023-07-12

https://www.kioxia.com/en-jp/rd/technology/topics/topics-47.html

트랩 전하가 Vth에 영향을 미치는 CTF 저장 원리. 리텐션을 무한대로 취급하지 않음.

## Interpretation policy

The model does not copy numerical claims about current commercial products into its simulation constants. HBF is limited to a public-information-based conceptual visualization. The interface and scientific-model document explicitly identify synthetic voltage, timing, geometry, Gray mapping, format and lane-count examples.
