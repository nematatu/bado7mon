import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Helper to construct a binary question node
 */
function q(question_id, category, question_text, yes, no) {
  return {
    type: 'question',
    question_id,
    category,
    question_text,
    yes,
    no,
  };
}

/**
 * Helper to construct a player leaf node
 */
function p(player) {
  return {
    type: 'leaf',
    player,
  };
}

// ============================================================================
// 1. 日本男子シングルス (JP-MS: 16名)
// ============================================================================
const jpMsTree = q(
  'jp_ms_tier',
  '実績・タイトル',
  'オリンピックへの出場経験がある、または全日本総合選手権（一般）の男子シングルスで優勝した経験がありますか？',
  // YES (8名)
  q(
    'jp_ms_ntt',
    '所属チーム',
    '所属チーム（または現役時の主所属）は「NTT東日本」ですか？',
    // YES (4名)
    q(
      'jp_ms_ntt_world_medal',
      '実績・世界ランク',
      '世界選手権でメダルを獲得し、世界ランキングでもトップ2以内に入ったことがありますか？',
      // YES (2名)
      q(
        'jp_ms_momota_vs_naraoka',
        '利き手・実績',
        'サウスポー（左利き）で、世界選手権2連覇および年間11勝のギネス世界記録を達成していますか？',
        p({
          id: 1,
          name_ja: '桃田賢斗',
          name_kana: 'ももたけんと',
          name_en: 'Kento MOMOTA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'NTT東日本',
          hand: '左利き',
          tags: ['元世界ランク1位', '世界選手権2連覇', 'NTT東日本'],
          summary: '世界選手権2連覇・年間11勝でギネス認定された日本バドミントン界の歴史的エース。ヘアピンと緻密な配球が代名詞。',
        }),
        p({
          id: 2,
          name_ja: '奈良岡功大',
          name_kana: 'ならおかこうだい',
          name_en: 'Kodai NARAOKA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'NTT東日本',
          hand: '右利き',
          tags: ['パリ五輪代表', '世界選手権銀', 'NTT東日本'],
          summary: '驚異的なレシーブ力と粘り強いラリーで2023年世界選手権銀メダル・パリ五輪出場を果たした日本男子シングルスの大黒柱。',
        })
      ),
      // NO (2名)
      q(
        'jp_ms_tanaka_vs_tago',
        '世代・現役',
        '大学（日本大学）を経て実業団入りし、2020年代の現在も現役S/JリーガーとしてBWFツアーや全日本総合で優勝していますか？',
        p({
          id: 3,
          name_ja: '田中湧士',
          name_kana: 'たなかゆうし',
          name_en: 'Yushi TANAKA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'NTT東日本',
          hand: '右利き',
          tags: ['全日本総合王者', 'NTT東日本', '日本大学出身'],
          summary: '抜群のスピードとジャンプスマッシュを武器に全日本総合優勝＆BWFワールドツアー制覇を成し遂げたNTT東日本の主力アタッカー。',
        }),
        p({
          id: 4,
          name_ja: '田児賢一',
          name_kana: 'たごけんいち',
          name_en: 'Kenichi TAGO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '元NTT東日本',
          hand: '右利き',
          tags: ['全日本総合6連覇', '全英OP準優勝', 'ロンドン五輪代表'],
          summary: '2010年全英オープン準優勝・全日本総合選手権6連覇を達成し、日本男子シングルス躍進の礎を築いた天才肌プレーヤー。',
        })
      )
    ),
    // NO (4名)
    q(
      'jp_ms_tonami',
      '所属チーム',
      '所属チーム（または現役時の主所属）は「トナミ運輸」ですか？',
      // YES (2名)
      q(
        'jp_ms_sasaki_vs_tsuneyama',
        '利き手・五輪',
        'サウスポー（左利き）で、2012年ロンドン五輪ベスト8・2016年リオ五輪連続出場のレジェンド世代ですか？',
        p({
          id: 5,
          name_ja: '佐々木翔',
          name_kana: 'ささきしょう',
          name_en: 'Sho SASAKI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '元トナミ運輸',
          hand: '左利き',
          tags: ['ロンドン五輪8強', '世界ランク最高6位', 'サウスポー'],
          summary: '粘り強いフットワークと魂のスマッシュでロンドン五輪ベスト8・世界ランキング最高6位に到達した左腕レジェンド。',
        }),
        p({
          id: 6,
          name_ja: '常山幹太',
          name_kana: 'つねやまかんた',
          name_en: 'Kanta TSUNEYAMA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'トナミ運輸',
          hand: '右利き',
          tags: ['東京五輪代表', 'フレンチOP優勝', 'トナミ運輸'],
          summary: '東京五輪代表・2021年フレンチオープン（Super 750）優勝など長年世界のトップツアーで戦い続けるトナミ運輸の実力者。',
        })
      ),
      // NO (2名)
      q(
        'jp_ms_nishimoto_vs_watanabe',
        '所属・経歴',
        '180cmの長身で、大学（中央大学）を経て実業団入りし、ジャパンオープン初優勝や2024年パリ五輪出場を果たしていますか？（※高校卒業後に直接BIPROGYへ加入した選手なら「いいえ」）',
        p({
          id: 7,
          name_ja: '西本拳太',
          name_kana: 'にしもとけんた',
          name_en: 'Kenta NISHIMOTO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'ジェイテクト',
          hand: '右利き',
          tags: ['パリ五輪代表', 'ジャパンOP優勝', 'ジェイテクト'],
          summary: '2022年ジャパンオープン優勝・2023年スペインマスターズ優勝・2024年パリ五輪出場を果たした鉄人のベテランエース。',
        }),
        p({
          id: 8,
          name_ja: '渡邉航貴',
          name_kana: 'わたなべこうき',
          name_en: 'Koki WATANABE',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'BIPROGY',
          hand: '右利き',
          tags: ['BIPROGY', 'スイスOP優勝', 'カナダOP優勝'],
          summary: '高速フットワークと鋭いカウンターでスイスOP・カナダOPを制し、世界ランキングTOP15入りを果たしたBIPROGYのエース。',
        })
      )
    )
  ),
  // NO (8名)
  q(
    'jp_ms_next_team',
    '所属チーム',
    '「トナミ運輸」または「ジェイテクト」に所属している社会人選手ですか？',
    // YES (4名)
    q(
      'jp_ms_next_b100_winner',
      '実績・タイトル',
      'BWFワールドツアー（Super 100のベトナムオープン等）で国際大会の男子シングルス優勝経験がありますか？',
      // YES (2名)
      q(
        'jp_ms_takahashi_vs_obayashi',
        '利き手・経歴',
        'サウスポー（左利き）で、高校（東大阪大柏原高）卒業後に直接「トナミ運輸」へ加入しましたか？（※右利きで早稲田大学を経て加入した選手なら「いいえ」）',
        p({
          id: 9,
          name_ja: '高橋洸士',
          name_kana: 'たかはしこう',
          name_en: 'Koo TAKAHASHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'トナミ運輸',
          hand: '左利き',
          tags: ['トナミ運輸', 'サウスポー', 'BWFツアー優勝'],
          summary: 'キレのある左腕からの強打とスピードで国際大会タイトルを獲得し、日本代表で頭角を現すトナミ運輸のサウスポー。',
        }),
        p({
          id: 10,
          name_ja: '大林拓真',
          name_kana: 'おおばやしたくま',
          name_en: 'Takuma OBAYASHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'トナミ運輸',
          hand: '右利き',
          tags: ['トナミ運輸', 'ベトナムOP優勝', '早稲田大出身'],
          summary: '福井・勝山高から早稲田大を経てトナミ運輸で活躍。ベトナムオープン優勝など世界の舞台で安定した実力を発揮する。',
        })
      ),
      // NO (2名)
      q(
        'jp_ms_hatano_vs_ogawa',
        '所属チーム',
        '「トナミ運輸」に所属（埼玉栄高校から高卒加入）していますか？（※法政大学を経て「ジェイテクト」に所属する選手なら「いいえ」）',
        p({
          id: 11,
          name_ja: '秦野陸',
          name_kana: 'はたのりく',
          name_en: 'Riku HATANO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'トナミ運輸',
          hand: '右利き',
          tags: ['トナミ運輸', '埼玉栄出身', '日本代表'],
          summary: '埼玉栄高からトナミ運輸入りし、アグレッシブな攻撃スタイルで熊本マスターズや国際大会に挑む2001年世代の実力派。',
        }),
        p({
          id: 12,
          name_ja: '小川翔悟',
          name_kana: 'おがわしょうご',
          name_en: 'Shogo OGAWA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'ジェイテクト',
          hand: '右利き',
          tags: ['ジェイテクト', '法政大学出身', '全日本社会人上位'],
          summary: '法政大学主将を経てジェイテクトで活躍し、韓国オープンなどBWF国際大会にも参戦する日本男子シングルスの新戦力。',
        })
      )
    ),
    // NO (4名)
    q(
      'jp_ms_next_ntt_group',
      '所属・経歴',
      '「NTT東日本」に所属（または過去に在籍）していましたか？',
      // YES (2名)
      q(
        'jp_ms_koga_vs_takei',
        '世代・出身',
        '1990年代生まれ（1996年生まれ）で、早稲田大学を卒業して実業団入りしましたか？（※2000年代生まれでふたば未来学園高から高卒加入した選手なら「いいえ」）',
        p({
          id: 13,
          name_ja: '古賀穂',
          name_kana: 'こがみのる',
          name_en: 'Minoru KOGA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'AC長野パルセイロ / 元NTT東日本',
          hand: '右利き',
          tags: ['早稲田大出身', '古賀兄弟', '国際大会優勝'],
          summary: '早稲田大学・NTT東日本を経て国際大会に精力的に参戦。粘り強いラリーと闘志あふれるプレーで知られるファイター。',
        }),
        p({
          id: 14,
          name_ja: '武井凜生',
          name_kana: 'たけいりき',
          name_en: 'Riki TAKEI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'NTT東日本',
          hand: '右利き',
          tags: ['NTT東日本', 'ふたば未来出身', '次世代ホープ'],
          summary: 'ふたば未来学園からNTT東日本へ進み、日本代表派遣で国際大会経験を積む次世代シングルス有望株。',
        })
      ),
      // NO (2名)
      q(
        'jp_ms_okimoto_vs_miyashita',
        '所属・利き手',
        'サウスポー（左利き）で、高校卒業後に「BIPROGY」へ加入した社会人選手ですか？（※右利きで明治大学に所属する学生トップ選手なら「いいえ」）',
        p({
          id: 15,
          name_ja: '沖本優大',
          name_kana: 'おきもとゆうだい',
          name_en: 'Yudai OKIMOTO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'BIPROGY',
          hand: '左利き',
          tags: ['BIPROGY', '埼玉栄出身', 'サウスポー'],
          summary: '高校タイトルを総なめにしBIPROGYへ加入。スピードと左腕からの鋭いショットで世界ツアーに挑む新世代エース候補。',
        }),
        p({
          id: 16,
          name_ja: '宮下怜',
          name_kana: 'みやしたれい',
          name_en: 'Rei MIYASHITA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '明治大学',
          hand: '右利き',
          tags: ['明治大学', 'インカレ上位', '国際大会優勝'],
          summary: '明治大学に在籍しながら日本代表派遣で国際チャレンジ大会にも出場・活躍する学生バドミントン界屈指のシングルス選手。',
        })
      )
    )
  )
);

// ============================================================================
// 2. 日本男子ダブルス・混合ダブルス (JP-MD/XD: 16名)
// ============================================================================
const jpMdTree = q(
  'jp_md_world_medal_era',
  '実績・タイトル',
  'オリンピック・世界選手権でのメダル獲得、または全英オープン・BWF Super 500以上のツアー上位大会で優勝した経験がありますか？',
  // YES (8名)
  q(
    'jp_md_tonami_pairs',
    '所属チーム',
    '所属チーム（または現役時の主所属）は「トナミ運輸」ですか？',
    // YES (4名)
    q(
      'jp_md_hokikoba_vs_sonokamu',
      '実績・世界王者',
      '2021年の世界選手権で日本男子ダブルス史上初の「優勝（金メダル）」および世界ランキング1位を達成したペアの選手ですか？',
      // YES (2名)
      q(
        'jp_md_hoki_vs_kobayashi',
        '利き手・役割',
        'サウスポー（左利き）で、主に後衛からの豪快なジャンピングスマッシュを最大の武器とする選手ですか？',
        p({
          id: 17,
          name_ja: '小林優吾',
          name_kana: 'こばやしゆうご',
          name_en: 'Yugo KOBAYASHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'トナミ運輸',
          hand: '左利き',
          tags: ['ホキコバ', '2021世界王者', '元世界ランク1位'],
          summary: '保木卓朗との「ホキコバ」で日本男子ダブルス史上初の世界選手権優勝＆世界ランク1位を達成した左のハードヒッター。',
        }),
        p({
          id: 18,
          name_ja: '保木卓朗',
          name_kana: 'ほきたくろう',
          name_en: 'Takuro HOKI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'トナミ運輸',
          hand: '右利き',
          tags: ['ホキコバ', '2021世界王者', '元世界ランク1位'],
          summary: '鉄壁のドライブ・前衛ワークと冷静なゲームメイクで「ホキコバ」を世界頂点へ導いた日本男子ダブルスの要。',
        })
      ),
      // NO (2名)
      q(
        'jp_md_sonoda_vs_kamura',
        '役割・現役状況',
        '主に後衛からの連続アタックと超高速ドライブを担い、東京五輪後もトナミ運輸で現役プレーヤーとして活動を続けている選手ですか？（※前衛を主戦場とし東京五輪後に現役を引退した相方なら「いいえ」）',
        p({
          id: 19,
          name_ja: '園田啓悟',
          name_kana: 'そのだけいご',
          name_en: 'Keigo SONODA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'トナミ運輸',
          hand: '右利き',
          tags: ['ソノカム', '世界選手権銀', '東京五輪代表'],
          summary: '嘉村健士との「ソノカム」で世界選手権銀メダル・世界ランク2位を記録。超高速ドライブ戦術で世界を席巻した。',
        }),
        p({
          id: 20,
          name_ja: '嘉村健士',
          name_kana: 'かむらたけし',
          name_en: 'Takeshi KAMURA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '元トナミ運輸',
          hand: '右利き',
          tags: ['ソノカム', '世界選手権銀', '前衛の職人'],
          summary: '「ソノカム」の絶対的前衛として世界選手権銀・銅メダルと東京五輪ベスト8に貢献した日本男子ダブルスの功労者。',
        })
      )
    ),
    // NO (4名)
    q(
      'jp_md_xd_focus',
      '主戦場・種目',
      '混合ダブルス（XD）を主力種目として、2025〜2026年現在も現役で世界ツアーを戦っている選手ですか？',
      // YES (2名)
      q(
        'jp_md_watanabe_vs_midorikawa',
        '利き手・五輪メダル',
        'サウスポー（左利き）で、オリンピックの混合ダブルスで2大会連続の銅メダルおよび全英オープン優勝を達成している選手ですか？',
        p({
          id: 21,
          name_ja: '渡辺勇大',
          name_kana: 'わたなべゆうた',
          name_en: 'Yuta WATANABE',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'XD',
          category_label: '混合ダブルス / 男子ダブルス',
          team: 'J-POWER（旧BIPROGY）',
          hand: '左利き',
          tags: ['五輪2連続銅', '全英OP優勝', 'ワタガシ・ワタタグ'],
          summary: '東京・パリ五輪XD連続銅メダル、遠藤大由とのMDでも全英OP2連覇を達成した日本バドミントン界最高峰のファンタジスタ。',
        }),
        p({
          id: 22,
          name_ja: '緑川大輝',
          name_kana: 'みどりかわひろき',
          name_en: 'Hiroki MIDORIKAWA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'XD',
          category_label: '混合ダブルス / 男子ダブルス',
          team: 'NTT東日本',
          hand: '右利き',
          tags: ['ミドサイ', 'NTT東日本', '混合ダブルス代表エース'],
          summary: '齋藤夏らとのペアで世界ツアー上位に定着し、山下恭平との男子ダブルスでも活躍するNTT東日本の二刀流プレーヤー。',
        })
      ),
      // NO (2名)
      q(
        'jp_md_endo_vs_hayakawa',
        '実績・五輪',
        '2020年・2021年の全英オープン男子ダブルスで2連覇を達成し、リオ五輪に続いて2021年東京五輪にも出場した「鉄壁レシーブ」の選手ですか？',
        p({
          id: 23,
          name_ja: '遠藤大由',
          name_kana: 'えんどうひろゆき',
          name_en: 'Hiroyuki ENDO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '元日本ユニシス（現BIPROGYコーチ）',
          hand: '右利き',
          tags: ['全英OP2連覇', 'リオ＆東京五輪8強', '鉄壁レシーブ'],
          summary: '世界屈指のディフェンス力で早川賢一、続いて渡辺勇大と組み、日本人男子ダブルス初の全英オープン2連覇を成し遂げた名手。',
        }),
        p({
          id: 24,
          name_ja: '早川賢一',
          name_kana: 'はやかわけんいち',
          name_en: 'Kenichi HAYAKAWA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '元日本ユニシス（現BIPROGY監督・コーチ）',
          hand: '右利き',
          tags: ['エンハヤ', '2014トマス杯優勝', 'リオ五輪8強'],
          summary: '遠藤大由とのペアで全英OP準優勝3度・2014年トマス杯初優勝・リオ五輪ベスト8に輝いた日本男子ダブルスの開拓者。',
        })
      )
    )
  ),
  // NO (8名)
  q(
    'jp_md_active_biprogy',
    '所属チーム',
    '所属チームは「BIPROGY」ですか？',
    // YES (4名)
    q(
      'jp_md_okamitsu_vs_kumanishi',
      '世代・実績',
      '1990年代生まれ（1997〜1998年生まれ）で、世界選手権出場やBWF Super 500（熊本マスターズ等）での準優勝実績があるペアの選手ですか？（※2002年生まれの若手ペアなら「いいえ」）',
      // YES (2名)
      q(
        'jp_md_okamura_vs_mitsuhashi',
        '出身・経歴',
        '北海道（帯広大谷高校）出身で、高校卒業後に直接実業団入りした長身選手ですか？（※福島・富岡高から日本大学を経て加入した選手なら「いいえ」）',
        p({
          id: 25,
          name_ja: '岡村洋輝',
          name_kana: 'おかむらひろき',
          name_en: 'Hiroki OKAMURA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'BIPROGY',
          hand: '右利き',
          tags: ['オカミツ', 'BIPROGY', '日本代表MD主力'],
          summary: '三橋健也との「オカミツ」ペアで世界ランキング上位に躍進。長いリーチを活かしたドライブと連続攻撃が光る。',
        }),
        p({
          id: 26,
          name_ja: '三橋健也',
          name_kana: 'みつはしけんや',
          name_en: 'Kenya MITSUHASHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'BIPROGY',
          hand: '右利き',
          tags: ['オカミツ', 'BIPROGY', '日本大学出身'],
          summary: '富岡高・日本大を経てBIPROGYで活躍。岡村洋輝とのコンビで世界ツアー上位常連へと飛躍したセンス抜群のプレーヤー。',
        })
      ),
      // NO (2名)
      q(
        'jp_md_kumagai_vs_nishi',
        '利き手・出身大学',
        'サウスポー（左利き）で、宮城県（聖ウルスラ学院英智高）から日本大学を経て加入した選手ですか？（※右利きで龍谷大学出身の選手なら「いいえ」）',
        p({
          id: 27,
          name_ja: '熊谷翔',
          name_kana: 'くまがいしょう',
          name_en: 'Kakeru KUMAGAI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス / 混合ダブルス',
          team: 'BIPROGY',
          hand: '左利き',
          tags: ['クマニシ', 'BIPROGY', 'サウスポー'],
          summary: '西大輝との「クマニシ」ペアで国内外の大会を席巻する左腕アタッカー。角度のある強打と積極的な前衛が魅力。',
        }),
        p({
          id: 28,
          name_ja: '西大輝',
          name_kana: 'にしひろき',
          name_en: 'Hiroki NISHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス / 混合ダブルス',
          team: 'BIPROGY',
          hand: '右利き',
          tags: ['クマニシ', 'BIPROGY', 'インカレ二冠'],
          summary: '龍谷大学時代にインカレMD/XD二冠を達成しBIPROGYへ加入。熊谷翔との男子ダブルスと混合ダブルスの両輪で世界へ挑む。',
        })
      )
    ),
    // NO (4名)
    q(
      'jp_md_ntt_vs_hitachi',
      '所属チーム',
      '早稲田大学出身同士で「NTT東日本」にて長年ペアを組み、全日本総合選手権で優勝したペアの選手ですか？（※「日立情報通信エンジニアリング」所属のペアなら「いいえ」）',
      // YES (2名)
      q(
        'jp_md_koga_vs_saito',
        '出身・プレースタイル',
        '埼玉県（埼玉栄高校）出身で、コートを飛び回るダイビングレシーブや混合ダブルスでの活躍でも知られる選手ですか？（※千葉県・富岡高出身の後衛強打者なら「いいえ」）',
        p({
          id: 29,
          name_ja: '古賀輝',
          name_kana: 'こがあきら',
          name_en: 'Akira KOGA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス / 混合ダブルス',
          team: 'NTT東日本（現ジェイテクト等でも活動）',
          hand: '右利き',
          tags: ['コガサイ', '全日本総合優勝', '超絶レシーブ'],
          summary: '齋藤太一との「コガサイ」で全日本総合優勝＆世界ツアー上位で活躍。コートを飛び回る驚異の反応速度でファンを魅了する。',
        }),
        p({
          id: 30,
          name_ja: '齋藤太一',
          name_kana: 'さいとうたいち',
          name_en: 'Taichi SAITO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'NTT東日本',
          hand: '右利き',
          tags: ['コガサイ', '全日本総合優勝', '早稲田大出身'],
          summary: '重厚な後衛スマッシュと安定したローテーションで古賀輝との「コガサイ」ペアを支え、日本代表として長年活躍した実力者。',
        })
      ),
      // NO (2名)
      q(
        'jp_md_shimogami_vs_nomura',
        '出身大学・二刀流',
        '日本体育大学出身で、男子ダブルスだけでなく混合ダブルス（XD）でも日本代表として国際大会優勝・上位入賞を重ねている選手ですか？（※法政大学出身の男子ダブルス専任パートナーなら「いいえ」）',
        p({
          id: 31,
          name_ja: '霜上雄一',
          name_kana: 'しもがみゆういち',
          name_en: 'Yuichi SHIMOGAMI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス / 混合ダブルス',
          team: '日立情報通信エンジニアリング',
          hand: '右利き',
          tags: ['シモノム', '日立情報通信', 'MD/XD二刀流'],
          summary: '野村拓海との男子ダブルス「シモノム」と混合ダブルスの二刀流で2025-2026シーズンの日本代表を牽引する急成長株。',
        }),
        p({
          id: 32,
          name_ja: '野村拓海',
          name_kana: 'のむらたくみ',
          name_en: 'Takumi NOMURA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '日立情報通信エンジニアリング',
          hand: '右利き',
          tags: ['シモノム', '日立情報通信', '法政大学出身'],
          summary: '霜上雄一との「シモノム」ペアで全日本社会人・全日本総合・BWFワールドツアーで快進撃を見せるドライブ＆前衛の名手。',
        })
      )
    )
  )
);

// ============================================================================
// 3. 日本女子シングルス (JP-WS: 16名)
// ============================================================================
const jpWsTree = q(
  'jp_ws_tier',
  '実績・タイトル',
  'オリンピック・世界選手権（シニア）への出場経験がある、または全日本総合選手権（一般）の女子シングルスで優勝した経験がありますか？',
  // YES (8名)
  q(
    'jp_ws_active_2025',
    '現役・世代',
    '2025〜2026年シーズンも現役でBWFワールドツアーやS/Jリーグの第一線に立っている選手ですか？',
    // YES (4名)
    q(
      'jp_ws_world_champ',
      '実績・世界女王',
      '世界選手権（シニア）での優勝（金メダル）および世界ランキング1位の両方を達成した「世界女王」経験者ですか？',
      // YES (2名)
      q(
        'jp_ws_yamaguchi_vs_okuhara',
        '所属・実績',
        '福井県出身・「再春館製薬所」所属で、2021年・2022年の世界選手権2連覇を達成していますか？',
        p({
          id: 33,
          name_ja: '山口茜',
          name_kana: 'やまぐちあかね',
          name_en: 'Akane YAMAGUCHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '再春館製薬所',
          hand: '右利き',
          tags: ['世界選手権2連覇', '元世界ランク1位', '再春館製薬所'],
          summary: '驚異的なコートカバーリングと変幻自在のアタックで世界選手権2連覇・全英OP優勝・五輪3大会連続8強を誇る日本の絶対的エース。',
        }),
        p({
          id: 34,
          name_ja: '奥原希望',
          name_kana: 'おくはらのぞみ',
          name_en: 'Nozomi OKUHARA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '太陽ホールディングス',
          hand: '右利き',
          tags: ['リオ五輪銅メダル', '2017世界女王', '全日本総合5度優勝'],
          summary: '2016年リオ五輪銅メダル・2017年世界選手権で日本人WS初の金メダルを獲得。不屈のフットワークで時代を切り拓いた女王。',
        })
      ),
      // NO (2名)
      q(
        'jp_ws_miyazaki_vs_nidaira',
        '所属・世代',
        '2000年代生まれ（2006年生まれ）で、世界ジュニア女王を経て「ACT SAIKYO」に所属し10代で世界ランキングTOP10入りを果たしましたか？（※1998年生まれ・「ヨネックス」所属なら「いいえ」）',
        p({
          id: 35,
          name_ja: '宮崎友花',
          name_kana: 'みやざきともか',
          name_en: 'Tomoka MIYAZAKI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'ACT SAIKYO',
          hand: '右利き',
          tags: ['世界ジュニア女王', 'ACT SAIKYO', '全日本総合優勝'],
          summary: 'しなやかなリストワークと天性の配球センスで10代にしてBWFツアー優勝＆全日本総合制覇を果たした次世代の日本エース。',
        }),
        p({
          id: 36,
          name_ja: '仁平菜月',
          name_kana: 'にだいらなつき',
          name_en: 'Natsuki NIDAIRA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'ヨネックス',
          hand: '右利き',
          tags: ['ヨネックス', '全日本総合優勝', '富岡高校出身'],
          summary: '怪我を乗り越え全日本総合選手権で悲願の初優勝を達成。ヨネックスの柱として世界ツアーでも上位進出を重ねる実力者。',
        })
      )
    ),
    // NO (4名)
    q(
      'jp_ws_lefty_ohori_takahashi',
      '利き手',
      'サウスポー（左利き）で長身の攻撃的シングルスプレーヤーですか？',
      // YES (2名)
      q(
        'jp_ws_ohori_vs_takahashi',
        '所属・五輪',
        '「トナミ運輸」に所属し、2024年のタイマスターズ・オーストラリアオープン優勝およびパリ五輪ベスト8を達成して引退しましたか？（※元「BIPROGY」所属なら「いいえ」）',
        p({
          id: 37,
          name_ja: '大堀彩',
          name_kana: 'おおほりあや',
          name_en: 'Aya OHORI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '元トナミ運輸',
          hand: '左利き',
          tags: ['パリ五輪8強', 'アジア大会銅', 'トナミ運輸'],
          summary: '華麗な左腕のクロスショットで2024年BWFツアー2勝＆パリ五輪ベスト8を達成し、有終の美を飾ったサウスポーエース。',
        }),
        p({
          id: 38,
          name_ja: '髙橋沙也加',
          name_kana: 'たかはしさやか',
          name_en: 'Sayaka TAKAHASHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '元BIPROGY',
          hand: '左利き',
          tags: ['全日本総合優勝', 'ユーバー杯優勝メンバー', 'サウスポー'],
          summary: '豪快な左のスマッシュと攻撃力を武器に全日本総合優勝・世界ランクTOP10近くまで活躍したBIPROGYのサウスポーアタッカー。',
        })
      ),
      // NO (2名)
      q(
        'jp_ws_mitani_vs_hirose',
        '実績・所属',
        '「NTT東日本」に所属し、2014年の世界選手権で日本人女子シングルス37年ぶりの銅メダルを獲得した選手ですか？（※元「三洋電機／パナソニック」で全日本総合5度優勝の選手なら「いいえ」）',
        p({
          id: 39,
          name_ja: '三谷美菜津',
          name_kana: 'みたにみなつ',
          name_en: 'Minatsu MITANI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '元NTT東日本',
          hand: '右利き',
          tags: ['2014世界選手権銅', 'フレンチOP優勝', 'NTT東日本'],
          summary: '2012年フレンチオープン優勝・2014年世界選手権銅メダルを獲得し、その後の日本女子シングルス黄金期の先駆けとなった名選手。',
        }),
        p({
          id: 40,
          name_ja: '廣瀬栄理子',
          name_kana: 'ひろせえりこ',
          name_en: 'Eriko HIROSE',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '元三洋電機 / パナソニック',
          hand: '右利き',
          tags: ['全日本総合5度優勝', '2011全英OP準優勝', '北京五輪代表'],
          summary: '全日本総合5度制覇・2011年全英オープン準優勝・北京五輪ベスト16など、2000年代〜2010年代初頭の日本WSを牽引した女王。',
        })
      )
    )
  ),
  // NO (8名)
  q(
    'jp_ws_next_team_west',
    '所属チーム',
    '九州・中国地方のS/Jリーグ強豪チーム（「再春館製薬所」または「ACT SAIKYO」）に所属する選手ですか？',
    // YES (4名)
    q(
      'jp_ws_next_gunji_suizu',
      '実績・世代',
      '2002〜2003年生まれで、世界ジュニア選手権優勝またはBWFワールドツアー（Super 100）優勝の実績がある実業団中堅・主力選手ですか？',
      // YES (2名)
      q(
        'jp_ws_gunji_vs_suizu',
        '所属・世界ジュニア',
        '熊本県出身・「再春館製薬所」所属で、2019年の世界ジュニア選手権で優勝（金メダル）していますか？（※「ACT SAIKYO」所属なら「いいえ」）',
        p({
          id: 41,
          name_ja: '郡司莉子',
          name_kana: 'ぐんじりこ',
          name_en: 'Riko GUNJI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '再春館製薬所',
          hand: '右利き',
          tags: ['世界ジュニア女王', '再春館製薬所', '八代白百合出身'],
          summary: '2019年世界ジュニア女王。爆発的なジャンプ力と攻撃力で国際大会タイトルを積み重ねる再春館製薬所のアタッカー。',
        }),
        p({
          id: 42,
          name_ja: '水津愛美',
          name_kana: 'すいづまなみ',
          name_en: 'Manami SUIZU',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'ACT SAIKYO',
          hand: '右利き',
          tags: ['ACT SAIKYO', '柳井商工出身', 'BWFツアー優勝'],
          summary: '柳井商工高からACT SAIKYOへ進み、丁寧なラリーと勝負強さでベトナムオープンなど国際大会で優勝・上位入賞を果たす。',
        })
      ),
      // NO (2名)
      q(
        'jp_ws_akechi_vs_watanabe',
        '出身校・実績',
        '柳井商工高校の出身で、インターハイ優勝および国際チャレンジ大会優勝を経て日本代表に選出されていますか？（※倉敷中央高出身の再春館若手選手なら「いいえ」）',
        p({
          id: 43,
          name_ja: '明地陽菜',
          name_kana: 'あけちひな',
          name_en: 'Hina AKECHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '再春館製薬所',
          hand: '右利き',
          tags: ['再春館製薬所', '柳井商工出身', '国際大会優勝'],
          summary: '柳井商工から再春館製薬所入りし、スピード溢れるフットワークで国際チャレンジ優勝やBWFワールドツアー参戦を果たす若手有望株。',
        }),
        p({
          id: 44,
          name_ja: '渡邉柚乃',
          name_kana: 'わたなべゆずの',
          name_en: 'Yuzuno WATANABE',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '再春館製薬所',
          hand: '右利き',
          tags: ['再春館製薬所', '倉敷中央出身', '熊本マスターズ出場'],
          summary: '倉敷中央高から再春館製薬所に加入し、地元・熊本マスターズジャパン2026にも出場するなど急成長を見せる新鋭。',
        })
      )
    ),
    // NO (4名)
    q(
      'jp_ws_yonex_group',
      '所属チーム',
      '所属チームは「ヨネックス」ですか？',
      // YES (2名)
      q(
        'jp_ws_takahashi_asuka_vs_ebihara',
        '出身校・世代',
        '福島県・ふたば未来学園高校の出身で、1999年生まれの選手ですか？（※栃木県・作新学院高校出身なら「いいえ」）',
        p({
          id: 45,
          name_ja: '髙橋明日香',
          name_kana: 'たかはしあすか',
          name_en: 'Asuka TAKAHASHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'ヨネックス',
          hand: '右利き',
          tags: ['ヨネックス', 'ふたば未来出身', '全日本総合上位'],
          summary: '恵まれた体格から繰り出す角度のある強打で全日本総合ベスト4や国際大会優勝の実績を持つヨネックスの主力WS。',
        }),
        p({
          id: 46,
          name_ja: '海老原詩織',
          name_kana: 'えびはらしおり',
          name_en: 'Shiori EBIHARA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'ヨネックス',
          hand: '右利き',
          tags: ['ヨネックス', '作新学院出身', '国際大会派遣'],
          summary: '粘り強いラリーと運動量を武器に国内大会上位や欧州国際大会派遣で活躍するヨネックスのシングルスプレーヤー。',
        })
      ),
      // NO (2名)
      q(
        'jp_ws_sugiyama_vs_konishi',
        '所属チーム',
        '「BIPROGY」に所属するシングルス専任選手ですか？（※「岐阜Bluvic」所属でシングルスと女子ダブルスの両種目に出場する選手なら「いいえ」）',
        p({
          id: 47,
          name_ja: '杉山薫',
          name_kana: 'すぎやまかおる',
          name_en: 'Kaoru SUGIYAMA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'BIPROGY',
          hand: '右利き',
          tags: ['BIPROGY', 'ふたば未来出身', 'BWFツアー優勝'],
          summary: 'ふたば未来学園からBIPROGY入りし、国内外のタイトル獲得で世界ランキングを急上昇させた日本代表女子シングルスの実力派。',
        }),
        p({
          id: 48,
          name_ja: '小西春七',
          name_kana: 'こにしはるな',
          name_en: 'Haruna KONISHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス / 女子ダブルス',
          team: '岐阜Bluvic（旧丸杉）',
          hand: '右利き',
          tags: ['岐阜Bluvic', '熊本マスターズ出場', '単複二刀流'],
          summary: '岐阜Bluvicに所属し、熊本マスターズジャパン2026では女子シングルスと女子ダブルスの両種目に出場する二刀流選手。',
        })
      )
    )
  )
);

// ============================================================================
// 4. 日本女子ダブルス・混合ダブルス (JP-WD/XD: 16名)
// ============================================================================
const jpWdTree = q(
  'jp_wd_era_active',
  '世代・ペア系統',
  '2021年東京五輪〜2024年パリ五輪サイクルの女子ダブルス（WD）日本代表4大主力ペア（パリ五輪銅メダルペア、世界選手権2連覇の長身ペア、世界選手権3度銀メダルペア、またはBIPROGYの現主力WDペア）の選手ですか？',
  // YES (8名)
  q(
    'jp_wd_kyushu_teams',
    '所属・ルーツ',
    '熊本県の実業団チーム「再春館製薬所」に現在所属している、またはキャリアの主力を再春館製薬所で過ごしたペアの選手ですか？',
    // YES (4名)
    q(
      'jp_wd_shidamatsu_vs_fukuhiro',
      '五輪メダル',
      '2024年パリ五輪の女子ダブルスで「銅メダル」を獲得したペアの選手ですか？',
      // YES (2名)
      q(
        'jp_wd_shida_vs_matsuyama',
        '出身地',
        '秋田県出身（青森山田高校卒）で、高速ローテーションの展開力でペアを牽引する選手ですか？（※福岡県出身・2016年世界ジュニアWD女王の相方なら「いいえ」）',
        p({
          id: 49,
          name_ja: '志田千陽',
          name_kana: 'しだちはる',
          name_en: 'Chiharu SHIDA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '再春館製薬所',
          hand: '右利き',
          tags: ['シダマツ', 'パリ五輪銅メダル', '全英OP優勝'],
          summary: '松山奈未との「シダマツ」で全英オープン制覇＆パリ五輪銅メダルを獲得。スピード感溢れる連続攻撃で世界を魅了する。',
        }),
        p({
          id: 50,
          name_ja: '松山奈未',
          name_kana: 'まつやまなみ',
          name_en: 'Nami MATSUYAMA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '再春館製薬所',
          hand: '右利き',
          tags: ['シダマツ', 'パリ五輪銅メダル', '世界ジュニア女王'],
          summary: '抜群のネット前タッチと鋭いインターセプトで「シダマツ」の前衛・攻撃の起点を担い、パリ五輪銅メダルに輝いた名手。',
        })
      ),
      // NO (2名)
      q(
        'jp_wd_fukushima_vs_hirota',
        '役割・現役動向',
        '力強い後衛アタックと無尽蔵のスタミナを武器とし、2024年後半以降も別の世界女王経験者と新ペアを組んで世界ツアー第一線で活躍している選手ですか？',
        p({
          id: 51,
          name_ja: '福島由紀',
          name_kana: 'ふくしまゆき',
          name_en: 'Yuki FUKUSHIMA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '岐阜Bluvic（旧丸杉・再春館）',
          hand: '右利き',
          tags: ['フクヒロ', '世界選手権銀3度', '元世界ランク1位'],
          summary: '廣田彩花との「フクヒロ」で世界ランク1位・全英OP優勝を達成。さらに松本麻佑との新ペアでも世界トップ戦線で活躍。',
        }),
        p({
          id: 52,
          name_ja: '廣田彩花',
          name_kana: 'ひろたさやか',
          name_en: 'Sayaka HIROTA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '岐阜Bluvic（旧丸杉・再春館）',
          hand: '右利き',
          tags: ['フクヒロ', '世界選手権銀3度', '元世界ランク1位'],
          summary: '膝の大怪我を乗り越え東京五輪出場を果たすなど、鉄壁のレシーブと前衛の読みで黄金時代を築いた名プレーヤー。',
        })
      )
    ),
    // NO (4名)
    q(
      'jp_wd_nagamatsu_vs_nakaiwa',
      '実績・世界選手権2連覇',
      '北海道出身・元「北都銀行」所属の長身コンビで、2018年・2019年の世界選手権女子ダブルス2連覇を達成したペアの選手ですか？（※「BIPROGY」所属の現役ペアなら「いいえ」）',
      // YES (2名)
      q(
        'jp_wd_matsumoto_vs_nagahara',
        '身長・現役動向',
        '身長177cmの日本人女子最長身クラスで、パリ五輪後に「ほねごり」へ移籍して現役を続けている選手ですか？',
        p({
          id: 53,
          name_ja: '松本麻佑',
          name_kana: 'まつもとまゆ',
          name_en: 'Mayu MATSUMOTO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: 'ほねごり（旧北都銀行）',
          hand: '右利き',
          tags: ['ナガマツ・フクマツ', '世界選手権2連覇', '177cm長身強打'],
          summary: '177cmの高さから打ち下ろす強打で世界選手権2連覇を達成。現在は福島由紀とのペアでも世界の頂点を狙う。',
        }),
        p({
          id: 54,
          name_ja: '永原和可那',
          name_kana: 'ながはらわかな',
          name_en: 'Wakana NAGAHARA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '元北都銀行',
          hand: '右利き',
          tags: ['ナガマツ', '世界選手権2連覇', '東京＆パリ五輪代表'],
          summary: '松本麻佑とのペアで世界選手権2連覇・全英OP制覇・五輪2大会連続出場を成し遂げた日本WD界屈指のハードヒッター。',
        })
      ),
      // NO (2名)
      q(
        'jp_wd_nakanishi_vs_iwanaga',
        '経歴・役割',
        '早稲田大学を経て実業団入りし、高い打点からの後衛スマッシュと広い守備範囲で攻撃の軸を担う選手ですか？（※柳井商工高から高卒加入した前衛主体の相方なら「いいえ」）',
        p({
          id: 55,
          name_ja: '中西貴映',
          name_kana: 'なかにしきえ',
          name_en: 'Kie NAKANISHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: 'BIPROGY',
          hand: '右利き',
          tags: ['ナカイワ', 'BIPROGY', '世界ランキング上位'],
          summary: '岩永鈴との「ナカイワ」ペアでBWFワールドツアー複数優勝・世界ランキングTOP6入りを果たしたBIPROGYの主力WD。',
        }),
        p({
          id: 56,
          name_ja: '岩永鈴',
          name_kana: 'いわながりん',
          name_en: 'Rin IWANAGA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: 'BIPROGY',
          hand: '右利き',
          tags: ['ナカイワ', 'BIPROGY', '柳井商工出身'],
          summary: '俊敏な前衛ワークと鋭いドライブ・プッシュでペアを牽引し、世界の強豪ペアを次々と撃破する。',
        })
      )
    )
  ),
  // NO (8名)
  q(
    'jp_wd_legend_pairs',
    '時代・レジェンドペア',
    '2008年北京五輪〜2016年リオ五輪の時代に日本中を熱狂させた伝説の女子ダブルスペア（リオ五輪金メダルペア、または三洋電機の全日本総合5連覇ペア）の選手ですか？',
    // YES (4名)
    q(
      'jp_wd_takamatsu_vs_ogushio',
      '五輪金メダル',
      '2016年リオデジャネイロ五輪で日本バドミントン史上初の「オリンピック金メダル」を獲得したペアの選手ですか？',
      // YES (2名)
      q(
        'jp_wd_takahashi_vs_matsutomo',
        '役割・現役状況',
        'パワフルな後衛スマッシュとキャプテンシーで攻撃を牽引し、2020年に現役を引退した選手ですか？（※前衛の職人としてリオ金を獲り、その後も混合ダブルス等でプレーした相方なら「いいえ」）',
        p({
          id: 57,
          name_ja: '髙橋礼華',
          name_kana: 'たかはしあやか',
          name_en: 'Ayaka TAKAHASHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '元日本ユニシス',
          hand: '右利き',
          tags: ['タカマツ', 'リオ五輪金メダル', '元世界ランク1位'],
          summary: '松友美佐紀との「タカマツ」で2016年リオ五輪金メダルを獲得。日本バドミントン界の歴史を塗り替えた絶対的キャプテン。',
        }),
        p({
          id: 58,
          name_ja: '松友美佐紀',
          name_kana: 'まつともみさき',
          name_en: 'Misaki MATSUTOMO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス / 混合ダブルス',
          team: '東京都バドミントン協会（旧BIPROGY）',
          hand: '右利き',
          tags: ['タカマツ', 'リオ五輪金メダル', '前衛の魔術師'],
          summary: '世界最高峰の前衛技術と読みでリオ五輪金メダルを獲得。その後は金子祐樹との混合ダブルスでも世界の舞台で戦った。',
        })
      ),
      // NO (2名)
      q(
        'jp_wd_shiota_vs_ogura',
        '経歴・五輪',
        '女子ダブルスペア解消後に混合ダブルスへ転向し、2012年ロンドン五輪にも2大会連続で出場した福岡県出身の選手ですか？',
        p({
          id: 59,
          name_ja: '潮田玲子',
          name_kana: 'しおたれいこ',
          name_en: 'Reiko SHIOTA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス / 混合ダブルス',
          team: '元三洋電機 / 日本ユニシス',
          hand: '右利き',
          tags: ['オグシオ・イケシオ', '北京＆ロンドン五輪', '世界選手権銅'],
          summary: '小椋久美子との「オグシオ」で2007年世界選手権銅・北京五輪5位、池田信太郎との「イケシオ」でロンドン五輪出場を果たしたスター。',
        }),
        p({
          id: 60,
          name_ja: '小椋久美子',
          name_kana: 'おぐらくみこ',
          name_en: 'Kumiko OGURA',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '元三洋電機',
          hand: '右利き',
          tags: ['オグシオ', '2007世界選手権銅', '全日本総合5連覇'],
          summary: '潮田玲子との「オグシオ」で全日本総合5連覇＆世界選手権銅メダルを獲得し、日本中にバドミントンブームを巻き起こした立役者。',
        })
      )
    ),
    // NO (4名)
    q(
      'jp_wd_watanabe_partners',
      '混合ダブルス実績',
      'オリンピック混合ダブルス2大会連続銅メダリストの左腕男子エースと、混合ダブルスでペアを組んだ経験がある選手ですか？',
      // YES (2名)
      q(
        'jp_wd_igarashi_vs_taguchi',
        '五輪メダル・実績',
        '東京五輪・パリ五輪の混合ダブルスで2大会連続の銅メダルおよび全英オープン3度優勝を達成し、2024年後半から女子ダブルスにも本格挑戦している「BIPROGY」所属の選手ですか？',
        p({
          id: 61,
          name_ja: '五十嵐有紗',
          name_kana: 'いがらしありさ',
          name_en: 'Arisa IGARASHI (HIGASHINO)',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'XD',
          category_label: '混合ダブルス / 女子ダブルス',
          team: 'BIPROGY',
          hand: '右利き',
          tags: ['ワタガシ', '五輪2連続銅メダル', '旧姓：東野有紗'],
          summary: '旧姓・東野有紗。男子顔負けのジャンピングスマッシュと超高速前衛で五輪2連続銅・全英OP3度優勝を果たし、現在はWDでも躍動。',
        }),
        p({
          id: 62,
          name_ja: '田口真彩',
          name_kana: 'たぐちまあや',
          name_en: 'Maya TAGUCHI',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'XD',
          category_label: '混合ダブルス / 女子ダブルス',
          team: 'ACT SAIKYO',
          hand: '左利き',
          tags: ['ワタタグ', '2023世界ジュニアWD女王', 'ACT SAIKYO'],
          summary: '2023年世界ジュニア女子ダブルス金メダリスト。混合ダブルス新ペア結成で大きな注目を集めるサウスポー新星。',
        })
      ),
      // NO (2名)
      q(
        'jp_wd_saito_vs_sakuramoto',
        '主戦場・所属',
        '「ACT SAIKYO」に所属し、混合ダブルス（XD）の日本代表主力として世界ツアー上位で活躍している右利きの選手ですか？（※「ヨネックス」所属のサウスポー女子ダブルス名手なら「いいえ」）',
        p({
          id: 63,
          name_ja: '齋藤夏',
          name_kana: 'さいとうなつ',
          name_en: 'Natsu SAITO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'XD',
          category_label: '混合ダブルス',
          team: 'ACT SAIKYO',
          hand: '右利き',
          tags: ['ミドサイ', 'ACT SAIKYO', 'カナダOP準優勝'],
          summary: '緑川大輝との「ミドサイ」ペアでジュニア時代から世界を舞台に戦い、巧みな前衛さばきで世界ランキング上位に定着するXDスペシャリスト。',
        }),
        p({
          id: 64,
          name_ja: '櫻本絢子',
          name_kana: 'さくらもとあやこ',
          name_en: 'Ayako SAKURAMOTO',
          country: '日本',
          flag: '🇯🇵',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: 'ヨネックス',
          hand: '左利き',
          tags: ['ヨネックス', 'サウスポーWD名手', 'スイスOP優勝'],
          summary: '数々のパートナーと組みBWFワールドツアー優勝・世界ランキング上位を経験しているヨネックスの左腕ダブルス職人。',
        })
      )
    )
  )
);

// ============================================================================
// 5. 海外男子シングルス (INTL-MS: 16名)
// ============================================================================
const intlMsTree = q(
  'intl_ms_region_era',
  '地域・世代',
  'アジア出身で、2025〜2026年現在も現役でBWFワールドツアーを戦っている選手ですか？（※ヨーロッパ出身の選手、またはすでに現役を引退したレジェンド選手なら「いいえ」）',
  // YES (8名)
  q(
    'intl_ms_southeast_asia',
    '国籍・地域',
    '東南アジア（インドネシア・タイ・マレーシア）の代表選手ですか？（※中国・台湾・インドの代表選手なら「いいえ」）',
    // YES (4名)
    q(
      'intl_ms_indonesia',
      '国籍',
      '「インドネシア」代表の選手ですか？',
      // YES (2名)
      q(
        'intl_ms_ginting_vs_christie',
        '五輪メダル・特徴',
        '2021年東京五輪の男子シングルスで「銅メダル」を獲得した、電光石火のスピードとネットプレーを武器とする選手ですか？（※2018年アジア大会金メダル・2024年全英オープン優勝の選手なら「いいえ」）',
        p({
          id: 65,
          name_ja: 'アンソニー・シニスカ・ギンティン',
          name_kana: 'あんそにーしにすかぎんてぃん',
          name_en: 'Anthony Sinisuka GINTING',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'インドネシア代表',
          hand: '右利き',
          tags: ['東京五輪銅メダル', 'アジア選手権王者', '超高速アタック'],
          summary: '超高速フットワークとトリッキーなネット前のフェイント、爆発的なジャンピングスマッシュで世界中を沸かせるインドネシアのスピードスター。',
        }),
        p({
          id: 66,
          name_ja: 'ジョナタン・クリスティ',
          name_kana: 'じょなたんくりすてぃ',
          name_en: 'Jonatan CHRISTIE',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'インドネシア代表',
          hand: '右利き',
          tags: ['2024全英OP王者', 'アジア大会金メダル', 'ジョジョ'],
          summary: '愛称「ジョジョ」。2018年アジア大会金メダル、2024年全英オープン＆アジア選手権制覇を達成したインドネシアの王道オールラウンダー。',
        })
      ),
      // NO (2名)
      q(
        'intl_ms_kunlavut_vs_leeziijia',
        '国籍・実績',
        '「タイ」代表で、世界ジュニア3連覇・2023年世界選手権優勝・2024年パリ五輪銀メダルを獲得した選手ですか？（※「マレーシア」代表で全英OP優勝・パリ五輪銅メダルの選手なら「いいえ」）',
        p({
          id: 67,
          name_ja: 'クンラヴット・ヴィチットサーン',
          name_kana: 'くんらゔっとゔぃちっとさーん',
          name_en: 'Kunlavut VITIDSARN',
          country: 'タイ',
          flag: '🇹🇭',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'タイ代表',
          hand: '右利き',
          tags: ['2023世界王者', 'パリ五輪銀メダル', '世界ジュニア3連覇'],
          summary: '世界ジュニア3連覇から2023年シニア世界選手権制覇、さらにパリ五輪銀メダルに輝いたタイ史上最高の天才ディフェンシブ・カウンター選手。',
        }),
        p({
          id: 68,
          name_ja: 'リー・ジージャ',
          name_kana: 'りーじーじゃ',
          name_en: 'LEE Zii Jia',
          country: 'マレーシア',
          flag: '🇲🇾',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'マレーシア代表（プロ）',
          hand: '右利き',
          tags: ['パリ五輪銅メダル', '2021全英OP王者', 'バックハンドスマッシュ'],
          summary: '豪快なジャンプスマッシュと代名詞のバックハンドスマッシュで2021年全英OP優勝・2024年パリ五輪銅メダルを獲得したマレーシアのエース。',
        })
      )
    ),
    // NO (4名)
    q(
      'intl_ms_china_pair',
      '国籍',
      '「中国」代表の選手ですか？',
      // YES (2名)
      q(
        'intl_ms_shiyuqi_vs_lishifeng',
        '世代・実績',
        '1990年代生まれ（1996年生まれ）で、世界ランキング1位に到達し全英オープンを2018年・2025年と2度制覇している選手ですか？（※2000年生まれで2023年全英OP＆アジア大会王者の選手なら「いいえ」）',
        p({
          id: 69,
          name_ja: '石宇奇（シー・ユーチー）',
          name_kana: 'しーゆーちー',
          name_en: 'SHI Yu Qi',
          country: '中国',
          flag: '🇨🇳',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['世界ランク1位', '全英OP王者', 'スディルマン杯立役者'],
          summary: '圧倒的なショットの威力とコートを支配する配球で世界ランキング1位に到達し、団体戦でも無類の強さを誇る中国男子のエース。',
        }),
        p({
          id: 70,
          name_ja: '李詩灃（リー・シーフェン）',
          name_kana: 'りーしーふぇん',
          name_en: 'LI Shi Feng',
          country: '中国',
          flag: '🇨🇳',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['2023全英OP王者', 'アジア大会金メダル', '2000年生まれ'],
          summary: '2023年全英オープンと杭州アジア大会を無敗で制した中国2000年世代の筆頭。粘り強いラリーからの終盤のギアチェンジが武器。',
        })
      ),
      // NO (2名)
      q(
        'intl_ms_chou_vs_sen',
        '国籍・世代',
        '「台湾（チャイニーズ・タイペイ）」代表で、五輪3大会連続ベスト8および世界ツアー通算10勝以上を誇るベテランの鉄人選手ですか？（※「インド」代表でパリ五輪ベスト4の若手エースなら「いいえ」）',
        p({
          id: 71,
          name_ja: '周天成（チョウ・ティエンチェン）',
          name_kana: 'ちょうてぃえんちぇん',
          name_en: 'CHOU Tien Chen',
          country: '台湾',
          flag: '🇹🇼',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '台湾代表',
          hand: '右利き',
          tags: ['世界ランク最高2位', '五輪3大会連続8強', '台湾の鉄人'],
          summary: 'トレーナーと二人三脚で世界中を転戦し、大病も克服して世界ツアー通算10勝以上・五輪3大会連続ベスト8を達成した不屈の鉄人。',
        }),
        p({
          id: 72,
          name_ja: 'ラクシャ・セン',
          name_kana: 'らくしゃせん',
          name_en: 'Lakshya SEN',
          country: 'インド',
          flag: '🇮🇳',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'インド代表',
          hand: '右利き',
          tags: ['パリ五輪ベスト4', '2022トマス杯優勝', '世界選手権銅'],
          summary: '2021年世界選手権銅・2022年全英OP準優勝・2024年パリ五輪ベスト4など大舞台で抜群の勝負強さを見せるインド男子の若きエース。',
        })
      )
    )
  ),
  // NO (8名)
  q(
    'intl_ms_europe_vs_legends',
    '地域・現役',
    'ヨーロッパ（デンマーク・フランス）出身の現役選手ですか？（※2000〜2010年代の世界を彩ったアジアの引退レジェンド「四大天王」世代なら「いいえ」）',
    // YES (4名)
    q(
      'intl_ms_denmark_vs_france',
      '国籍',
      '北欧のバドミントン強豪国「デンマーク」代表の選手ですか？（※「フランス」代表の選手なら「いいえ」）',
      // YES (2名)
      q(
        'intl_ms_axelsen_vs_antonsen',
        '五輪金メダル・身長',
        '身長194cmで、東京五輪・パリ五輪の男子シングルス2連覇および世界選手権2度優勝を達成した絶対王者ですか？',
        p({
          id: 73,
          name_ja: 'ビクトル・アクセルセン',
          name_kana: 'びくとるあくせるせん',
          name_en: 'Viktor AXELSEN',
          country: 'デンマーク',
          flag: '🇩🇰',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'デンマーク代表',
          hand: '右利き',
          tags: ['五輪2連覇（東京・パリ）', '世界選手権2度優勝', '194cmの絶対王者'],
          summary: '194cmの長身から放つ急角度スマッシュと鉄壁の守備で五輪2連覇を達成。流暢な中国語も操る現代バドミントン界の絶対王者。',
        }),
        p({
          id: 74,
          name_ja: 'アンデルス・アントンセン',
          name_kana: 'あんでるすあんとんせん',
          name_en: 'Anders ANTONSEN',
          country: 'デンマーク',
          flag: '🇩🇰',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'デンマーク代表',
          hand: '右利き',
          tags: ['ワールドツアーファイナルズ優勝', '欧州王者', '世界選手権銀'],
          summary: 'トリッキーな緩急と勝負強いメンタルでワールドツアーファイナルズやマレーシアOP（Super 1000）を制したデンマーク第2の至宝。',
        })
      ),
      // NO (2名)
      q(
        'intl_ms_lanier_vs_popov',
        '世代・種目',
        '2005年生まれのシングルス専任選手で、2024年ジャパンオープン（Super 750）を19歳の若さで制覇しましたか？（※実弟との男子ダブルスとシングルスの二刀流で戦う選手なら「いいえ」）',
        p({
          id: 75,
          name_ja: 'アレックス・ラニエ',
          name_kana: 'あれっくすらにえ',
          name_en: 'Alex LANIER',
          country: 'フランス',
          flag: '🇫🇷',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: 'フランス代表',
          hand: '右利き',
          tags: ['2024ジャパンOP優勝', '欧州選手権王者', 'フランスの超新星'],
          summary: '19歳でジャパンオープン2024を制覇し、2025年欧州選手権も優勝。爆発的なフィジカルとパワーで世界トップへ駆け上がった新世代スター。',
        }),
        p({
          id: 76,
          name_ja: 'トマ・ジュニア・ポポフ',
          name_kana: 'とまじゅにあぽぽふ',
          name_en: 'Toma Junior POPOV',
          country: 'フランス',
          flag: '🇫🇷',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス / 男子ダブルス',
          team: 'フランス代表',
          hand: '右利き',
          tags: ['ポポフ兄弟の兄', '単複二刀流', '全英OP上位'],
          summary: '実弟との男子ダブルスと男子シングルスの二刀流で世界のトップ選手を次々と破るフランス代表の頼れるエース。',
        })
      )
    ),
    // NO (4名)
    q(
      'intl_ms_legends_china',
      '国籍',
      '「中国」代表としてオリンピックの男子シングルス金メダルを獲得したレジェンド選手ですか？',
      // YES (2名)
      q(
        'intl_ms_lindan_vs_chenlong',
        '利き手・実績',
        'サウスポー（左利き）で、2008年北京五輪・2012年ロンドン五輪の2連覇および世界選手権5度優勝を達成していますか？',
        p({
          id: 77,
          name_ja: '林丹（リン・ダン）',
          name_kana: 'りんだん',
          name_en: 'LIN Dan',
          country: '中国',
          flag: '🇨🇳',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '元中国代表',
          hand: '左利き',
          tags: ['五輪2連覇', '世界選手権5度優勝', 'スーパー・ダン'],
          summary: '五輪2連覇・世界選手権5度・全英OP6度制覇など主要タイトルを全制覇（キャリアスーパーグランドスラム）した史上最高のGOAT。',
        }),
        p({
          id: 78,
          name_ja: '諶龍（チェン・ロン）',
          name_kana: 'ちぇんろん',
          name_en: 'CHEN Long',
          country: '中国',
          flag: '🇨🇳',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '元中国代表',
          hand: '右利き',
          tags: ['リオ五輪金メダル', '五輪3連続メダル', '世界選手権2連覇'],
          summary: 'ロンドン銅・リオ金・東京銀と五輪3大会連続メダルを獲得。鉄壁のディフェンスから「万里の長城」と称された中国の大エース。',
        })
      ),
      // NO (2名)
      q(
        'intl_ms_lcw_vs_taufik',
        '国籍・実績',
        '「マレーシア」代表として五輪3大会連続銀メダルを獲得し、世界ランキング1位に349週君臨した国民的英雄ですか？（※2004年アテネ五輪金メダルの「インドネシア」代表なら「いいえ」）',
        p({
          id: 79,
          name_ja: 'リー・チョンウェイ',
          name_kana: 'りーちょんうぇい',
          name_en: 'LEE Chong Wei',
          country: 'マレーシア',
          flag: '🇲🇾',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '元マレーシア代表',
          hand: '右利き',
          tags: ['五輪3連続銀メダル', '世界1位通算349週', 'マレーシアの英雄'],
          summary: '超人的なバネとスピードでBWFスーパーシリーズ通算46勝・世界ランク1位349週を記録し、数々の歴史的名勝負を演じた伝説。',
        }),
        p({
          id: 80,
          name_ja: 'タウフィック・ヒダヤット',
          name_kana: 'たうふぃっくひだやっと',
          name_en: 'Taufik HIDAYAT',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'M',
          category: 'MS',
          category_label: '男子シングルス',
          team: '元インドネシア代表',
          hand: '右利き',
          tags: ['アテネ五輪金メダル', '2005世界王者', '伝説のバックハンド'],
          summary: '2004年アテネ五輪金メダル・2005年世界選手権王者。芸術的なネットプレーと世界最速のバックハンドスマッシュで一時代を築いた天才。',
        })
      )
    )
  )
);

// ============================================================================
// 6. 海外男子ダブルス・混合ダブルス (INTL-MD/XD: 16名)
// ============================================================================
const intlMdTree = q(
  'intl_md_indonesia_or_eastasia',
  '国籍・種目系統',
  '東アジア（中国・韓国・台湾）出身の選手、または混合ダブルス（XD）で世界選手権優勝を果たした選手ですか？（※インドネシア・マレーシア・インド・デンマークの男子ダブルス専任選手なら「いいえ」）',
  // YES (8名)
  q(
    'intl_md_china_korea_md',
    '国籍・種目',
    '「中国」または「韓国」の代表で、男子ダブルス（MD）で2023年世界選手権優勝または2024年パリ五輪銀メダルを獲得したペアの選手ですか？',
    // YES (4名)
    q(
      'intl_md_liangwang_vs_seokang',
      '国籍',
      '「中国」代表で、2024年パリ五輪の男子ダブルス銀メダルおよび世界ランキング1位を獲得したペアの選手ですか？（※「韓国」代表の2023年世界選手権優勝ペアなら「いいえ」）',
      // YES (2名)
      q(
        'intl_md_liang_vs_wang',
        '役割・プレースタイル',
        '主に「後衛」から重砲のようなジャンピングスマッシュを打ち込むパワーヒッターですか？（※主に「前衛」での超高速インターセプトとゲームメイクを担う相方なら「いいえ」）',
        p({
          id: 81,
          name_ja: '梁偉鏗（リャン・ウェイカン）',
          name_kana: 'りゃんうぇいかん',
          name_en: 'LIANG Wei Keng',
          country: '中国',
          flag: '🇨🇳',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['梁王ペア', 'パリ五輪銀メダル', '世界ランク1位'],
          summary: '王昶との「梁王」ペアで世界ランキング1位・パリ五輪銀メダルを獲得。後衛から相手コートを突き刺す豪快な重砲スマッシュが代名詞。',
        }),
        p({
          id: 82,
          name_ja: '王昶（ワン・チャン）',
          name_kana: 'わんちゃん',
          name_en: 'WANG Chang',
          country: '中国',
          flag: '🇨🇳',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['梁王ペア', 'パリ五輪銀メダル', '前衛の魔術師'],
          summary: '超人的な反射神経の前衛インターセプトと笑顔のプレーで大人気を集める中国MDのスター。世界1位ペアの前衛を担う。',
        })
      ),
      // NO (2名)
      q(
        'intl_md_seo_vs_kang',
        '利き手・二冠',
        'サウスポー（左利き）で、2023年世界選手権で「男子ダブルス」と「混合ダブルス」の2種目同時優勝（二冠）を達成した選手ですか？',
        p({
          id: 83,
          name_ja: 'ソ・スンジェ（徐承宰）',
          name_kana: 'そすんじぇ',
          name_en: 'SEO Seung Jae',
          country: '韓国',
          flag: '🇰🇷',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス / 混合ダブルス',
          team: '韓国代表',
          hand: '左利き',
          tags: ['2023世界選手権MD&XD二冠', 'サウスポー', '韓国の絶対的柱'],
          summary: '2023年世界選手権でMDとXDの二冠を達成した現代最高のオールラウンド・ダブルスプレーヤー。',
        }),
        p({
          id: 84,
          name_ja: 'カン・ミンヒョク（姜敏赫）',
          name_kana: 'かんみんひょく',
          name_en: 'KANG Min Hyuk',
          country: '韓国',
          flag: '🇰🇷',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '韓国代表',
          hand: '右利き',
          tags: ['2023世界選手権MD王者', '高速ドライブ', '韓国代表'],
          summary: '2023年世界選手権男子ダブルス金メダリスト。低空ドライブと鉄壁のレシーブで韓国MDを牽引する。',
        })
      )
    ),
    // NO (4名)
    q(
      'intl_md_taiwan_olympic_gold',
      '種目・五輪2連覇',
      '「台湾（チャイニーズ・タイペイ）」代表で、東京五輪・パリ五輪の男子ダブルスで史上初の「五輪2連覇」を達成したペアの選手ですか？（※混合ダブルス［XD］の世界王者なら「いいえ」）',
      // YES (2名)
      q(
        'intl_md_leeyang_vs_wangchilin',
        '役割・現役状況',
        '主に前衛・ドライブ展開を担い、2024年パリ五輪金メダルと台北オープンを最後に現役を引退（大学教授等に就任）した選手ですか？（※身長188cmの後衛強打者で現役を続ける相方なら「いいえ」）',
        p({
          id: 85,
          name_ja: '李洋（リー・ヤン）',
          name_kana: 'りーやん',
          name_en: 'LEE Yang',
          country: '台湾',
          flag: '🇹🇼',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '元台湾代表',
          hand: '右利き',
          tags: ['五輪MD2連覇（東京・パリ）', '麟洋配', '大舞台の鬼'],
          summary: '東京五輪・パリ五輪の男子ダブルス2連覇を達成し、五輪通算12勝1敗という伝説を残して引退した台湾の英雄。',
        }),
        p({
          id: 86,
          name_ja: '王齊麟（ワン・チーリン）',
          name_kana: 'わんちーりん',
          name_en: 'WANG Chi-Lin',
          country: '台湾',
          flag: '🇹🇼',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '台湾代表',
          hand: '右利き',
          tags: ['五輪MD2連覇（東京・パリ）', '麟洋配', '188cm強打'],
          summary: '188cmの長身から放つ重爆スマッシュで五輪MD2連覇を達成。相方の引退後も新パートナーと現役で世界ツアーを戦う。',
        })
      ),
      // NO (2名)
      q(
        'intl_md_zheng_vs_dechapol',
        '国籍・五輪金',
        '「中国」代表で、混合ダブルスで世界選手権3度優勝および2024年パリ五輪金メダルを獲得した選手ですか？（※「タイ」代表の2021年世界選手権XD金メダリストなら「いいえ」）',
        p({
          id: 87,
          name_ja: '鄭思維（ジェン・シーウェイ）',
          name_kana: 'じぇんしーうぇい',
          name_en: 'ZHENG Si Wei',
          country: '中国',
          flag: '🇨🇳',
          gender: 'M',
          category: 'XD',
          category_label: '混合ダブルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['パリ五輪XD金メダル', '世界選手権3度優勝', '雅思コンビ'],
          summary: '混合ダブルス世界ランク1位に長年君臨し、世界選手権3勝＆パリ五輪金メダルで悲願を達成したXD界の絶対皇帝。',
        }),
        p({
          id: 88,
          name_ja: 'デチャポル・プアヴァラヌクロー',
          name_kana: 'でちゃぽるぷあゔぁらぬくろー',
          name_en: 'Dechapol PUAVARANUKROH',
          country: 'タイ',
          flag: '🇹🇭',
          gender: 'M',
          category: 'XD',
          category_label: '混合ダブルス / 男子ダブルス',
          team: 'タイ代表',
          hand: '右利き',
          tags: ['2021世界選手権XD王者', 'バスポー', '元世界ランク1位'],
          summary: '愛称「バス」。2021年世界選手権優勝＆世界ランク1位を獲得したタイ混合ダブルスの至宝。',
        })
      )
    )
  ),
  // NO (8名)
  q(
    'intl_md_minions_daddies',
    '伝説ペア',
    '「インドネシア」代表として世界を席巻し、2024年までに現役を引退（または第一線を勇退）した伝説の2大男子ダブルスペア（「ミニオンズ」または「ダディーズ」）の選手ですか？',
    // YES (4名)
    q(
      'intl_md_minions_vs_daddies',
      'ペア愛称・戦術',
      '超高速ノーロブ戦術で2017年〜2022年にかけて世界ランキング1位に約5年間（200週超）君臨した「ミニオンズ」ペアの選手ですか？（※世界選手権3度優勝の「ダディーズ」ペアなら「いいえ」）',
      // YES (2名)
      q(
        'intl_md_kevin_vs_gideon',
        '役割・プレースタイル',
        '主に「前衛」を担当し、背面ショットやノールックプッシュなど神業的なトリックプレーで世界中のファンを熱狂させた選手ですか？',
        p({
          id: 89,
          name_ja: 'ケビン・サンジャヤ・スカムルジョ',
          name_kana: 'けびんさんじゃやすかむるじょ',
          name_en: 'Kevin Sanjaya SUKAMULJO',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '元インドネシア代表',
          hand: '右利き',
          tags: ['ミニオンズ', '世界1位200週超', '神業前衛'],
          summary: '人間離れした反射神経とトリッキーな前衛プレーで男子ダブルスの常識を覆し、「ミニオンズ」旋風を巻き起こした稀代の天才。',
        }),
        p({
          id: 90,
          name_ja: 'マルクス・フェルナルディ・ギデオン',
          name_kana: 'まるくすふぇるなるでぃぎでおん',
          name_en: 'Marcus Fernaldi GIDEON',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '元インドネシア代表',
          hand: '右利き',
          tags: ['ミニオンズ', '世界1位200週超', '全英OP2連覇'],
          summary: '自由奔放な前衛を後ろから支え続けた無尽蔵の連続スマッシュとカバーリングで、年間最多優勝記録を樹立した名パートナー。',
        })
      ),
      // NO (2名)
      q(
        'intl_md_setiawan_vs_ahsan',
        '五輪金・役割',
        '2008年北京五輪の男子ダブルス金メダリストであり、世界選手権通算4度優勝を誇る「史上最高のネット前職人」ですか？',
        p({
          id: 91,
          name_ja: 'ヘンドラ・セティアワン',
          name_kana: 'へんどらせてぃあわん',
          name_en: 'Hendra SETIAWAN',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '元インドネシア代表',
          hand: '右利き',
          tags: ['ダディーズ', '北京五輪金メダル', '世界選手権4度優勝'],
          summary: '北京五輪金メダルと世界選手権4度優勝を達成。最小限の動きでシャトルを支配する「神の前衛」として尊敬を集めるレジェンド。',
        }),
        p({
          id: 92,
          name_ja: 'モハマド・アッサン',
          name_kana: 'もはまどあっさん',
          name_en: 'Mohammad AHSAN',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: '元インドネシア代表',
          hand: '右利き',
          tags: ['ダディーズ', '世界選手権3度優勝', '全英OP2度優勝'],
          summary: '「ダディーズ」の後衛として世界選手権3度（2013・2015・2019）優勝。鋭角なスマッシュと熱い闘志で30代後半まで頂点で戦った。',
        })
      )
    ),
    // NO (4名)
    q(
      'intl_md_chia_rankireddy',
      '国籍',
      '「マレーシア」または「インド」の代表エースですか？（※「デンマーク」または「インドネシア」の現役代表なら「いいえ」）',
      // YES (2名)
      q(
        'intl_md_chia_vs_rankireddy',
        '国籍・実績',
        '「マレーシア」代表で、2022年世界選手権優勝および東京・パリ五輪の2大会連続銅メダルを獲得した選手ですか？（※「インド」代表で初速565km/hのギネス世界最速スマッシュ記録保持者なら「いいえ」）',
        p({
          id: 93,
          name_ja: 'アーロン・チア',
          name_kana: 'あーろんちあ',
          name_en: 'Aaron CHIA',
          country: 'マレーシア',
          flag: '🇲🇾',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'マレーシア代表',
          hand: '右利き',
          tags: ['2022世界選手権王者', '五輪2連続銅メダル', 'チア/ソー'],
          summary: 'マレーシア史上初の世界選手権金メダル（2022東京）と五輪2大会連続銅メダルをもたらした大舞台の勝負師。',
        }),
        p({
          id: 94,
          name_ja: 'サトウィクサイラジ・ランキレディ',
          name_kana: 'さとぅぃくさいらじらんきれでぃ',
          name_en: 'Satwiksairaj RANKIREDDY',
          country: 'インド',
          flag: '🇮🇳',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'インド代表',
          hand: '右利き',
          tags: ['ギネス最速565km/h', 'アジア大会金', '世界ランク1位経験'],
          summary: 'インド男子ダブルス史上初の世界ランク1位＆アジア大会金メダルを獲得。初速565km/hのギネス世界最速スマッシュ保持者。',
        })
      ),
      // NO (2名)
      q(
        'intl_md_astrup_vs_alfian',
        '国籍・特徴',
        '「デンマーク」代表のサウスポー（左利き）で、2023年世界選手権銀メダル・2024年ワールドツアーファイナルズ優勝＆世界ランク1位到達を果たした選手ですか？（※「インドネシア」代表で2023・2024全英OP2連覇の選手なら「いいえ」）',
        p({
          id: 95,
          name_ja: 'キム・アストルップ',
          name_kana: 'きむあすとるっぷ',
          name_en: 'Kim ASTRUP',
          country: 'デンマーク',
          flag: '🇩🇰',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'デンマーク代表',
          hand: '左利き',
          tags: ['世界選手権銀', 'ツアーファイナルズ優勝', '世界ランク1位経験'],
          summary: '熟練のコンビネーションで30代にして世界ランキング1位に到達。独特のサービスまわりと緩急自在のレシーブで相手を翻弄する左腕。',
        }),
        p({
          id: 96,
          name_ja: 'ファジャル・アルフィアン',
          name_kana: 'ふぁじゃるあるふぃあん',
          name_en: 'Fajar ALFIAN',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'M',
          category: 'MD',
          category_label: '男子ダブルス',
          team: 'インドネシア代表',
          hand: '右利き',
          tags: ['全英OP2連覇（2023・2024）', '元世界ランク1位', 'ファジャリ'],
          summary: '2023・2024年全英オープン2連覇＆世界ランキング1位を達成したインドネシア男子ダブルスの看板前衛プレーヤー。',
        })
      )
    )
  )
);

// ============================================================================
// 7. 海外女子シングルス (INTL-WS: 16名)
// ============================================================================
const intlWsTree = q(
  'intl_ws_region_group',
  '国籍・地域',
  '東アジア（韓国・中国・台湾）またはヨーロッパ（スペイン）出身の選手ですか？（※インド・タイ・インドネシア出身の選手なら「いいえ」）',
  // YES (8名)
  q(
    'intl_ws_big4_non_cn_plus_cyf',
    '五輪金・世界1位記録',
    'オリンピックの女子シングルス「金メダリスト」（2016リオ・2021東京・2024パリ）、または世界ランキング1位に通算200週以上君臨した台湾のレジェンド選手ですか？',
    // YES (4名)
    q(
      'intl_ws_olympic_gold_anseyoung_cyf',
      '五輪金メダル（東京・パリ）',
      '2021年東京五輪または2024年パリ五輪の女子シングルスで「金メダル」を獲得した選手ですか？',
      // YES (2名)
      q(
        'intl_ws_anseyoung_vs_chenyufei',
        '国籍・実績',
        '「韓国」代表で、2023年世界選手権・アジア大会・2024年パリ五輪金メダルを総なめにした現・世界ランキング1位女王ですか？（※「中国」代表の2021年東京五輪金メダリストなら「いいえ」）',
        p({
          id: 97,
          name_ja: 'アン・セヨン（安洗塋）',
          name_kana: 'あんせよん',
          name_en: 'AN Se Young',
          country: '韓国',
          flag: '🇰🇷',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '韓国代表',
          hand: '右利き',
          tags: ['パリ五輪金メダル', '2023世界女王', '世界ランク1位'],
          summary: '驚異的な鉄壁ディフェンスと無尽蔵のスタミナ、鋭いカウンターでパリ五輪金メダル＆年間10勝超を達成した現代女子シングルスの絶対女王。',
        }),
        p({
          id: 98,
          name_ja: '陳雨菲（チェン・ユーフェイ）',
          name_kana: 'ちぇんゆーふぇい',
          name_en: 'CHEN Yu Fei',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['東京五輪金メダル', '全英OP優勝', '中国WSエース'],
          summary: 'ミスをしない精緻なラリーと抜群の大舞台強さで2021年東京五輪金メダルを獲得。長年中国女子シングルスを背負い続けるエース。',
        })
      ),
      // NO (2名)
      q(
        'intl_ws_taitzuying_vs_marin',
        '国籍・プレースタイル',
        '「台湾（チャイニーズ・タイペイ）」代表で、変幻自在のフェイントから「コート上の魔術師」と愛され東京五輪銀メダル・世界1位通算214週を記録した右利きの選手ですか？（※「スペイン」代表の左利きリオ五輪金・世界選手権3度優勝の選手なら「いいえ」）',
        p({
          id: 99,
          name_ja: '戴資穎（タイ・ツーイン）',
          name_kana: 'たいつーいん',
          name_en: 'TAI Tzu Ying',
          country: '台湾',
          flag: '🇹🇼',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '台湾代表',
          hand: '右利き',
          tags: ['東京五輪銀メダル', '世界1位通算214週', '全英OP3度優勝'],
          summary: '誰にも真似できない芸術的なディセプション（フェイント）で全英OP3勝・東京五輪銀・世界1位214週を記録した台湾のレジェンド。',
        }),
        p({
          id: 100,
          name_ja: 'キャロリーナ・マリン',
          name_kana: 'きゃろりーなまりん',
          name_en: 'Carolina MARIN',
          country: 'スペイン',
          flag: '🇪🇸',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'スペイン代表',
          hand: '左利き',
          tags: ['リオ五輪金メダル', '世界選手権3度優勝', '全英OP2度優勝'],
          summary: 'アジア勢以外の女子として初の五輪金メダル（2016リオ）と世界選手権3度制覇を達成。気迫あふれる左の超高速アタックで知られる女王。',
        })
      )
    ),
    // NO (4名)
    q(
      'intl_ws_china_active_2025',
      '現役世代',
      '2000年生まれで、2025〜2026年現在のBWFワールドツアーで世界ランキングTOP5圏内に定着している中国の現役主力選手ですか？',
      // YES (2名)
      q(
        'intl_ws_wangzhiyi_vs_hanyue',
        '実績・タイトル',
        '2024年のアジア選手権・中国オープン（Super 1000）・ワールドツアーファイナルズを制覇し、世界ランキング2位まで躍進した選手ですか？',
        p({
          id: 101,
          name_ja: '王祉怡（ワン・ジーイー）',
          name_kana: 'わんじーいー',
          name_en: 'WANG Zhi Yi',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['ツアーファイナルズ優勝', 'アジア女王', '世界ランク2位'],
          summary: '鉄壁のレシーブと長いラリーを制する精神力で2024年にBWFビッグタイトルを連覇し、中国女子シングルスの新エースへと飛躍。',
        }),
        p({
          id: 102,
          name_ja: '韓悦（ハン・ユエ）',
          name_kana: 'はんゆえ',
          name_en: 'HAN Yue',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['世界ランクTOP5', 'アークティックOP優勝', '中国代表主力'],
          summary: '粘り強いフットワークと攻撃的なスマッシュで世界ランキングTOP5に定着し、ユーバー杯優勝にも貢献した中国代表の実力者。',
        })
      ),
      // NO (2名)
      q(
        'intl_ws_hebingjiao_vs_wangyihan',
        '利き手・五輪',
        'サウスポー（左利き）で、2024年パリ五輪の女子シングルスで銀メダルを獲得した選手ですか？（※右利きで2011年世界選手権優勝・2012年ロンドン五輪銀メダルの選手なら「いいえ」）',
        p({
          id: 103,
          name_ja: '何氷嬌（ヘ・ビンジャオ）',
          name_kana: 'へびんじゃお',
          name_en: 'HE Bing Jiao',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '元中国代表',
          hand: '左利き',
          tags: ['パリ五輪銀メダル', '世界選手権銅2度', 'サウスポー'],
          summary: '柔らかい左腕のタッチと鋭いカット・スマッシュでパリ五輪銀メダルを獲得。スポーツマンシップ溢れる姿でも世界中から愛された。',
        }),
        p({
          id: 104,
          name_ja: '王儀涵（ワン・イーハン）',
          name_kana: 'わんいーはん',
          name_en: 'WANG Yihan',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '元中国代表',
          hand: '右利き',
          tags: ['ロンドン五輪銀メダル', '2011世界女王', '元世界ランク1位'],
          summary: '2009年全英オープン優勝・2011年世界選手権金メダル・2012年ロンドン五輪銀メダルに輝き、中国WS黄金時代を象徴した攻撃型女王。',
        })
      )
    )
  ),
  // NO (8名: インド2名・タイ3名・インドネシア3名)
  q(
    'intl_ws_world_champ_or_no1',
    '世界女王・世界ランク1位',
    '世界選手権での優勝（金メダル）、または世界ランキング1位への到達を達成したことがありますか？',
    // YES (4名: シンドゥ, ネワール, インタノン, スサンティ)
    q(
      'intl_ws_india_vs_sea_legends',
      '国籍',
      '「インド」代表としてオリンピックメダルを獲得した選手ですか？（※「タイ」または「インドネシア」の代表選手なら「いいえ」）',
      // YES (2名)
      q(
        'intl_ws_sindhu_vs_nehwal',
        '身長・実績',
        '身長179cmの長身で、2016年リオ五輪銀・2021年東京五輪銅の2大会連続メダルおよび2019年世界選手権優勝を獲得していますか？',
        p({
          id: 105,
          name_ja: 'P.V.シンドゥ',
          name_kana: 'ぴーぶいしんどぅ',
          name_en: 'PUSARLA V. Sindhu',
          country: 'インド',
          flag: '🇮🇳',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'インド代表',
          hand: '右利き',
          tags: ['2019世界女王', '五輪2連続メダル（リオ銀・東京銅）', '179cm長身'],
          summary: '179cmのリーチから放つ強烈なスマッシュで五輪2大会連続メダル＆2019年世界選手権圧勝優勝を成し遂げたインドの国民的スーパースター。',
        }),
        p({
          id: 106,
          name_ja: 'サイナ・ネワール',
          name_kana: 'さいなねわーる',
          name_en: 'Saina NEHWAL',
          country: 'インド',
          flag: '🇮🇳',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '元インド代表',
          hand: '右利き',
          tags: ['ロンドン五輪銅メダル', '元世界ランク1位', 'インドの先駆者'],
          summary: '2012年ロンドン五輪でインドバドミントン史上初の五輪メダル（銅）を獲得し、インド女子として初めて世界ランク1位に立った開拓者。',
        })
      ),
      // NO (2名: インタノン, スサンティ)
      q(
        'intl_ws_intanon_vs_susanti',
        '国籍・時代',
        '「タイ」代表の現役選手で、2013年の世界選手権を18歳の史上最年少で制覇しましたか？（※1992年バルセロナ五輪でバドミントン競技初の女子シングルス金メダルを獲得した「インドネシア」の伝説女王なら「いいえ」）',
        p({
          id: 107,
          name_ja: 'ラチャノック・インタノン',
          name_kana: 'らちゃのっくいんたのん',
          name_en: 'Ratchanok INTANON',
          country: 'タイ',
          flag: '🇹🇭',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'タイ代表',
          hand: '右利き',
          tags: ['2013世界選手権最年少女王', '元世界ランク1位', '世界ジュニア3連覇'],
          summary: '世界ジュニア3連覇から18歳でシニア世界女王に輝き、スーパーシリーズ3週連続優勝で世界ランク1位にも到達したタイの至宝。',
        }),
        p({
          id: 111,
          name_ja: 'スシ・スサンティ',
          name_kana: 'すしすさんてぃ',
          name_en: 'Susi SUSANTI',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: '元インドネシア代表',
          hand: '右利き',
          tags: ['バルセロナ五輪金メダル', '1993世界女王', '全英OP4度優勝'],
          summary: '1992年バルセロナ五輪で男女シングルスアベック金メダルを達成したバドミントン史上の大レジェンド。',
        })
      )
    ),
    // NO (4名: トゥンジュン, ワルダニ, チョチュウォン, ブサナン)
    q(
      'intl_ws_indonesia_active',
      '国籍',
      '「インドネシア」代表の現役女子シングルス選手ですか？（※「タイ」代表の現役選手なら「いいえ」）',
      // YES (2名)
      q(
        'intl_ws_tunjung_vs_wardani',
        '五輪メダル・実績',
        '2023年熊本マスターズジャパン（Super 500）初代女王であり、2024年パリ五輪で銅メダルを獲得した選手ですか？',
        p({
          id: 109,
          name_ja: 'グレゴリア・マリスカ・トゥンジュン',
          name_kana: 'ぐれごりあまりすかとぅんじゅん',
          name_en: 'Gregoria Mariska TUNJUNG',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'インドネシア代表',
          hand: '右利き',
          tags: ['パリ五輪銅メダル', '2023熊本マスターズ優勝', '2017世界ジュニア女王'],
          summary: 'しなやかな強打とネットプレーで2023年熊本マスターズを制し、2024年パリ五輪ではインドネシア女子16年ぶりの五輪銅メダルを獲得。',
        }),
        p({
          id: 110,
          name_ja: 'プトリ・クスマ・ワルダニ',
          name_kana: 'ぷとりくすまわるだに',
          name_en: 'Putri Kusuma WARDANI',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'インドネシア代表',
          hand: '右利き',
          tags: ['韓国マスターズ優勝', 'インドネシア次世代エース', '2002年生まれ'],
          summary: 'スペインマスターズ・オーレアンマスターズ・韓国マスターズを制し、インドネシアWSを牽引する若き実力派。',
        })
      ),
      // NO (2名: チョチュウォン, ブサナン)
      q(
        'intl_ws_chochuwong_vs_busanan',
        '実績・全英OP',
        '1998年生まれで、2021年の全英オープン準優勝および2020年スペインマスターズ・2023年スイスオープン優勝を達成した選手ですか？（※1996年生まれで2024年カナダOP優勝・ジャパンOP準優勝の選手なら「いいえ」）',
        p({
          id: 108,
          name_ja: 'ポーンパウィ・チョチュウォン',
          name_kana: 'ぽーんぱうぃちょちゅうぉん',
          name_en: 'Pornpawee CHOCHUWONG',
          country: 'タイ',
          flag: '🇹🇭',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'タイ代表',
          hand: '右利き',
          tags: ['2021全英OP準優勝', 'スイスOP優勝', 'タイ代表主力'],
          summary: '2021年全英オープン準優勝・2020年スペインマスターズ＆2023年スイスオープン優勝など世界ランキング上位で活躍するタイの実力者。',
        }),
        p({
          id: 112,
          name_ja: 'ブサナン・オングバムルングファン',
          name_kana: 'ぶさなんおんぐばむるんぐふぁん',
          name_en: 'Busanan ONGBAMRUNGPHAN',
          country: 'タイ',
          flag: '🇹🇭',
          gender: 'F',
          category: 'WS',
          category_label: '女子シングルス',
          team: 'タイ代表',
          hand: '右利き',
          tags: ['2024ジャパンOP準優勝', 'カナダOP優勝', 'タイ代表ベテラン'],
          summary: '2024年カナダオープン優勝・ジャパンオープン準優勝など、長年にわたり世界ツアー第一線で活躍し続けるタイ代表の主力選手。',
        })
      )
    )
  )
);

// ============================================================================
// 8. 海外女子ダブルス・混合ダブルス (INTL-WD/XD: 16名)
// ============================================================================
const intlWdTree = q(
  'intl_wd_china_korea_top',
  '国籍・実績',
  '「中国」代表の五輪メダリスト（金・銀）、または2024年の全英オープンとワールドツアーファイナルズを両方制覇した「韓国」の女子ダブルス世界ランキング1位ペアの選手ですか？',
  // YES (8名)
  q(
    'intl_wd_china_wd_pairs',
    '国籍・種目',
    '「中国」代表の女子ダブルス（WD）専任選手で、2024年パリ五輪の女子ダブルス決勝を戦った（金メダルまたは銀メダルを獲得した）選手ですか？',
    // YES (4名)
    q(
      'intl_wd_fanchen_vs_shengtan',
      '実績・世代',
      '1997年生まれの同級生コンビで、世界選手権を史上最多の4度制覇し、2024年パリ五輪で悲願の「金メダル」を獲得したペアの選手ですか？（※2000年代生まれでパリ五輪「銀メダル」の若手ペアなら「いいえ」）',
      // YES (2名)
      q(
        'intl_wd_chen_vs_jia',
        '利き手・役割',
        '右利きで、気迫の掛け声と超高速の「前衛」インターセプト・ゲームメイクでペアを引っ張る選手ですか？（※サウスポー［左利き］で後衛からの強打を担う長身の相方なら「いいえ」）',
        p({
          id: 113,
          name_ja: '陳清晨（チェン・チンチェン）',
          name_kana: 'ちぇんちんちぇん',
          name_en: 'CHEN Qing Chen',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['パリ五輪金メダル', '世界選手権4度優勝', '凡晨コンビ'],
          summary: '世界選手権4勝・東京五輪銀・パリ五輪金メダルを達成。コートを鼓舞する情熱と神出鬼没の前衛が代名詞。',
        }),
        p({
          id: 114,
          name_ja: '賈一凡（ジャ・イーファン）',
          name_kana: 'じゃいーふぁん',
          name_en: 'JIA Yi Fan',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '中国代表',
          hand: '左利き',
          tags: ['パリ五輪金メダル', '世界選手権4度優勝', 'サウスポー強打'],
          summary: '左腕から繰り出す重厚なスマッシュと多彩な変化球で後衛を10年以上支え、パリ五輪金メダルで頂点を極めた最強サウスポー。',
        })
      ),
      // NO (2名)
      q(
        'intl_wd_liushengshu_vs_tanning',
        '年齢・役割',
        '2004年生まれ（2022年世界ジュニア選手権WD&XD二冠）で、主に後衛から男子並みの豪快なジャンピングスマッシュを連発する選手ですか？（※2003年生まれでシングルス出身の広い守備範囲とドライブを誇る相方なら「いいえ」）',
        p({
          id: 115,
          name_ja: '劉聖書（リウ・シェンシュ）',
          name_kana: 'りうしぇんしゅ',
          name_en: 'LIU Sheng Shu',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['パリ五輪銀メダル', '世界ランク1位', '聖譚コンビ'],
          summary: '20代前半コンビでパリ五輪銀メダル＆世界ランク1位に躍り出た中国WDの新女王。男子並みの連続強打が武器。',
        }),
        p({
          id: 116,
          name_ja: '譚寧（タン・ニン）',
          name_kana: 'たんにん',
          name_en: 'TAN Ning',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['パリ五輪銀メダル', '世界ランク1位', '聖譚コンビ'],
          summary: '元々シングルス出身の広い守備範囲とパワフルなドライブで世界ランキング1位・ワールドツアー複数制覇を成し遂げた新世代スター。',
        })
      )
    ),
    // NO (4名)
    q(
      'intl_wd_china_xd_queens',
      '国籍・種目',
      '「中国」代表としてオリンピック混合ダブルス（XD）の金メダルを獲得した前衛女王ですか？（※「韓国」代表の女子ダブルス選手なら「いいえ」）',
      // YES (2名)
      q(
        'intl_wd_huangyaqiong_vs_huangdongping',
        '五輪金・実績',
        '世界選手権の混合ダブルスで3度優勝し、2024年パリ五輪で無失ゲーム完全優勝の金メダルを獲得（表彰式直後にプロポーズを受けたことでも話題）した選手ですか？（※2021年東京五輪の混合ダブルス金メダリストなら「いいえ」）',
        p({
          id: 117,
          name_ja: '黄雅瓊（ファン・ヤーチョン）',
          name_kana: 'ふぁんやーちょん',
          name_en: 'HUANG Ya Qiong',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'XD',
          category_label: '混合ダブルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['パリ五輪XD金メダル', '世界選手権3度優勝', '史上最高のXD前衛'],
          summary: 'ネット前の絶対的な制圧力と読みの鋭さで混合ダブルス史を塗り替え、パリ五輪で無失ゲーム完全優勝を果たした女王。',
        }),
        p({
          id: 118,
          name_ja: '黄東萍（ファン・ドンピン）',
          name_kana: 'ふぁんどんぴん',
          name_en: 'HUANG Dong Ping',
          country: '中国',
          flag: '🇨🇳',
          gender: 'F',
          category: 'XD',
          category_label: '混合ダブルス',
          team: '中国代表',
          hand: '右利き',
          tags: ['東京五輪XD金メダル', '世界ランク1位経験', '中国XDエース'],
          summary: '2021年東京五輪XD金メダルを獲得し、その後も若手パートナーを引っ張って再び世界ランキング1位に立った名手。',
        })
      ),
      // NO (2名)
      q(
        'intl_wd_baek_vs_lee',
        '世代・特徴',
        '2000年生まれで、鉄壁のレシーブと長いラリーを作る配球でペアの守備・展開の軸を担う選手ですか？（※1994年生まれで世界ジュニア女王経験を持つ攻撃型の年上パートナーなら「いいえ」）',
        p({
          id: 119,
          name_ja: 'ペク・ハナ（白荷娜）',
          name_kana: 'ぺくはな',
          name_en: 'BAEK Ha Na',
          country: '韓国',
          flag: '🇰🇷',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '韓国代表',
          hand: '右利き',
          tags: ['2024全英OP優勝', 'ツアーファイナルズ優勝', '世界ランク1位経験'],
          summary: '2024年全英オープン・アジア選手権・ツアーファイナルズを制覇し世界ランキング1位に到達した韓国WDの守備の要。',
        }),
        p({
          id: 120,
          name_ja: 'イ・ソヒ（李紹希）',
          name_kana: 'いそひ',
          name_en: 'LEE So Hee',
          country: '韓国',
          flag: '🇰🇷',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '韓国代表',
          hand: '右利き',
          tags: ['全英OP2度優勝', 'ツアーファイナルズ優勝', '世界ランク1位経験'],
          summary: '異なるパートナーとのペアで全英オープンを2度制覇し世界トップに君臨。鋭いスマッシュと豊富な経験で韓国女子ダブルスを牽引する。',
        })
      )
    )
  ),
  // NO (8名)
  q(
    'intl_wd_korea_malaysia_wd',
    '国籍・種目',
    '「韓国」の2021年東京五輪・女子ダブルス銅メダルペア、または「マレーシア」の2024年パリ五輪・女子ダブルスベスト4ペアの選手ですか？（※「インドネシア」の女子ダブルス選手、または混合ダブルス［XD］の世界女王なら「いいえ」）',
    // YES (4名)
    q(
      'intl_wd_kimkong_vs_pearlythinaah',
      '国籍',
      '「韓国」代表で、2021年東京五輪の銅メダルおよび2023年全英オープン優勝を達成したペアの選手ですか？（※「マレーシア」代表ペアなら「いいえ」）',
      // YES (2名)
      q(
        'intl_wd_kim_vs_kong',
        '利き手・プレースタイル',
        'サウスポー（左利き）で、後衛からの豪快な強打とパワフルなスマッシュを放つ選手ですか？（※右利きで前衛・緩急を操る1992年生まれの相方なら「いいえ」）',
        p({
          id: 121,
          name_ja: 'コン・ヒヨン（孔熙容）',
          name_kana: 'こんひよん',
          name_en: 'KONG Hee Yong',
          country: '韓国',
          flag: '🇰🇷',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '韓国代表',
          hand: '左利き',
          tags: ['東京五輪銅メダル', '2023全英OP優勝', 'キムコン'],
          summary: '女子ダブルス界屈指の左腕パワーヒッター。東京五輪銅・全英OP制覇・ジャパンOP優勝など数々の栄冠を獲得。',
        }),
        p({
          id: 122,
          name_ja: 'キム・ソヨン（金昭映）',
          name_kana: 'きむそよん',
          name_en: 'KIM So Yeong',
          country: '韓国',
          flag: '🇰🇷',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: '韓国代表',
          hand: '右利き',
          tags: ['東京五輪銅メダル', '2023全英OP優勝', 'キムコン'],
          summary: '巧みなラケットワークと前衛でのゲームメイクで相方の強打を引き出し、2022年世界選手権銀メダル・世界ランク1位到達を果たした。',
        })
      ),
      // NO (2名)
      q(
        'intl_wd_pearly_vs_thinaah',
        '世代・特徴',
        '2000年生まれで、角度のある背面ショットやジャンプスマッシュ、ネット前の素早い飛びつきで攻撃の起点を作る選手ですか？（※1998年生まれで170cmのリーチと無尽蔵の持久力でコート全面をカバーする相方なら「いいえ」）',
        p({
          id: 123,
          name_ja: 'パーリー・タン（陳康楽）',
          name_kana: 'ぱーりーたん',
          name_en: 'Pearly TAN',
          country: 'マレーシア',
          flag: '🇲🇾',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: 'マレーシア代表',
          hand: '右利き',
          tags: ['パリ五輪ベスト4', 'フレンチOP優勝', 'パーリー＆ティナー'],
          summary: 'マレーシア女子ダブルス史上初の五輪ベスト4（2024パリ）に進出。閃きあふれる攻撃センスで観客を魅了する。',
        }),
        p({
          id: 124,
          name_ja: 'ティナー・ムラルイタラン',
          name_kana: 'てぃなーむらるいたらん',
          name_en: 'Thinaah MURALITHARAN',
          country: 'マレーシア',
          flag: '🇲🇾',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: 'マレーシア代表',
          hand: '右利き',
          tags: ['パリ五輪ベスト4', 'フレンチOP優勝', '驚異のコートカバー'],
          summary: '170cmのリーチと無尽蔵の持久力でコート全面をカバーし、世界ランキングTOP5入りを果たしたマレーシアの柱。',
        })
      )
    ),
    // NO (4名)
    q(
      'intl_wd_indonesia_vs_xd_champions',
      '国籍・種目',
      '「インドネシア」代表の女子ダブルス（WD）選手ですか？（※混合ダブルス［XD］で世界選手権を制した「タイ」または「韓国」の選手なら「いいえ」）',
      // YES (2名)
      q(
        'intl_wd_rahayu_vs_fadia',
        '五輪金メダル',
        '2021年東京五輪の女子ダブルスで、インドネシア女子ダブルス史上初の「オリンピック金メダル」を獲得した選手ですか？',
        p({
          id: 125,
          name_ja: 'アプリアニ・ラハユ',
          name_kana: 'あぷりあにらはゆ',
          name_en: 'Apriyani RAHAYU',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス',
          team: 'インドネシア代表',
          hand: '右利き',
          tags: ['東京五輪WD金メダル', '2023世界選手権銀', '爆発的パワー'],
          summary: '東京五輪でインドネシアWD初の金メダルを獲得。その後も新パートナーと組み2023年世界選手権銀メダルに輝いたインドネシアの太陽。',
        }),
        p({
          id: 126,
          name_ja: 'シティ・ファディア・シルバ・ラマダンティ',
          name_kana: 'してぃふぁでぃあしるばらまだんてぃ',
          name_en: 'Siti Fadia Silva RAMADHANTI',
          country: 'インドネシア',
          flag: '🇮🇩',
          gender: 'F',
          category: 'WD',
          category_label: '女子ダブルス / 混合ダブルス',
          team: 'インドネシア代表',
          hand: '右利き',
          tags: ['2023世界選手権銀', 'マレーシアOP優勝', '2000年生まれ'],
          summary: '東京五輪金メダリストの新パートナーに抜擢されるやいなやマレーシアOP・シンガポールOP制覇＆2023年世界選手権銀メダルを獲得した俊敏な名手。',
        })
      ),
      // NO (2名)
      q(
        'intl_wd_sapsiree_vs_chaeyujung',
        '国籍・利き手',
        '「タイ」代表の右利き選手で、2021年の世界選手権・混合ダブルスで優勝し世界ランキング1位に到達しましたか？（※「韓国」代表のサウスポーで2023年世界選手権・混合ダブルス優勝の選手なら「いいえ」）',
        p({
          id: 127,
          name_ja: 'サプシリー・タエラッタナチャイ',
          name_kana: 'さぷしりーたえらったなちゃい',
          name_en: 'Sapsiree TAERATTANACHAI',
          country: 'タイ',
          flag: '🇹🇭',
          gender: 'F',
          category: 'XD',
          category_label: '混合ダブルス / 女子ダブルス',
          team: 'タイ代表',
          hand: '右利き',
          tags: ['2021世界選手権XD女王', '元世界ランク1位', '愛称：ポポ'],
          summary: 'ワールドツアー3週連続優勝・2021年世界選手権制覇・世界ランク1位を達成したクールで鉄壁な前衛職人。',
        }),
        p({
          id: 128,
          name_ja: 'チェ・ユジョン（蔡侑玎）',
          name_kana: 'ちぇゆじょん',
          name_en: 'CHAE Yu Jung',
          country: '韓国',
          flag: '🇰🇷',
          gender: 'F',
          category: 'XD',
          category_label: '混合ダブルス',
          team: '元韓国代表',
          hand: '左利き',
          tags: ['2023世界選手権XD女王', 'サウスポー前衛', '韓国XD女王'],
          summary: 'サウスポー同士の混合ダブルスで2023年世界選手権金メダルを獲得した韓国史上屈指の左腕ネットプレーヤー。',
        })
      )
    )
  )
);

// ============================================================================
// Root Decision Tree Assembly (Depth 7 -> 128 Leaves)
// ============================================================================
const rawTree = q(
  'root_is_japanese',
  '国籍・地域',
  '日本の選手（日本代表・S/Jリーグ等で活躍する日本人選手）ですか？',
  // YES (64名: 日本人選手)
  q(
    'jp_is_male',
    '基本プロフィール',
    '男子選手ですか？',
    // YES (32名: 日本男子)
    q(
      'jp_m_is_singles',
      '種目',
      '主戦場は「シングルス（男子シングルス：MS）」ですか？（※男子ダブルス・混合ダブルス中心なら「いいえ」）',
      jpMsTree,
      jpMdTree
    ),
    // NO (32名: 日本女子)
    q(
      'jp_f_is_singles',
      '種目',
      '主戦場は「シングルス（女子シングルス：WS）」ですか？（※女子ダブルス・混合ダブルス中心なら「いいえ」）',
      jpWsTree,
      jpWdTree
    )
  ),
  // NO (64名: 海外BWF選手)
  q(
    'intl_is_male',
    '基本プロフィール',
    '男子選手ですか？',
    // YES (32名: 海外男子)
    q(
      'intl_m_is_singles',
      '種目',
      '主戦場は「シングルス（男子シングルス：MS）」ですか？（※男子ダブルス・混合ダブルス中心なら「いいえ」）',
      intlMsTree,
      intlMdTree
    ),
    // NO (32名: 海外女子)
    q(
      'intl_f_is_singles',
      '種目',
      '主戦場は「シングルス（女子シングルス：WS）」ですか？（※女子ダブルス・混合ダブルス中心なら「いいえ」）',
      intlWsTree,
      intlWdTree
    )
  )
);

// ============================================================================
// Annotate node_id, depth, candidates_count, and verify tree integrity
// ============================================================================
let nextNodeId = 1;
const players = [];
const seenIds = new Set();
const seenNames = new Set();

function annotate(node, depth = 0, pathSteps = []) {
  const nodeId = nextNodeId++;

  if (node.type === 'leaf') {
    const pl = node.player;
    if (!pl || typeof pl.id !== 'number') {
      throw new Error(`Invalid player leaf at depth ${depth}`);
    }
    if (seenIds.has(pl.id)) {
      throw new Error(`Duplicate player id: ${pl.id}`);
    }
    if (seenNames.has(pl.name_ja)) {
      throw new Error(`Duplicate player name_ja: ${pl.name_ja}`);
    }
    if (depth !== 7) {
      throw new Error(`Leaf ${pl.name_ja} is at depth ${depth}, expected depth 7`);
    }
    seenIds.add(pl.id);
    seenNames.add(pl.name_ja);

    players.push({
      ...pl,
      depth,
      route: pathSteps,
    });

    return {
      node_id: nodeId,
      type: 'leaf',
      depth,
      player: pl,
      pokemon: {
        id: pl.id,
        name_ja: pl.name_ja,
        name_kana: pl.name_kana,
        name_en: pl.name_en,
        type1: pl.category_label,
        type2: pl.team,
        country: pl.country,
        flag: pl.flag,
      },
      candidates_count: 1,
    };
  }

  const annotatedNode = {
    node_id: nodeId,
    type: 'question',
    depth,
    question_id: node.question_id,
    question_text: node.question_text,
    tier: depth < 3 ? 1 : depth < 5 ? 2 : 3,
    category: node.category,
    candidates_count: 0,
    yes: null,
    no: null,
  };

  annotatedNode.yes = annotate(node.yes, depth + 1, [
    ...pathSteps,
    {
      step: depth + 1,
      question_id: node.question_id,
      category: node.category,
      question_text: node.question_text,
      answer: 'yes',
    },
  ]);

  annotatedNode.no = annotate(node.no, depth + 1, [
    ...pathSteps,
    {
      step: depth + 1,
      question_id: node.question_id,
      category: node.category,
      question_text: node.question_text,
      answer: 'no',
    },
  ]);

  annotatedNode.candidates_count =
    annotatedNode.yes.candidates_count + annotatedNode.no.candidates_count;

  const expectedCount = Math.pow(2, 7 - depth);
  if (annotatedNode.candidates_count !== expectedCount) {
    throw new Error(
      `Node ${node.question_id} at depth ${depth} has ${annotatedNode.candidates_count} candidates, expected ${expectedCount}`
    );
  }

  return annotatedNode;
}

const finalTree = annotate(rawTree, 0, []);

if (players.length !== 128) {
  throw new Error(`Expected 128 players, got ${players.length}`);
}

// Write data files
const dataDir = path.join(ROOT_DIR, 'data');
fs.mkdirSync(dataDir, { recursive: true });

const treeJsonStr = JSON.stringify(finalTree, null, 2);
fs.writeFileSync(path.join(dataDir, 'tree.json'), treeJsonStr + '\n', 'utf8');
fs.writeFileSync(
  path.join(dataDir, 'tree.js'),
  `window.TREE_DATA = ${treeJsonStr};\n`,
  'utf8'
);
fs.writeFileSync(
  path.join(dataDir, 'players.json'),
  JSON.stringify(players, null, 2) + '\n',
  'utf8'
);

console.log(
  `✅ Built decision tree successfully: ${players.length} players, ${nextNodeId - 1 - players.length} question nodes, exact depth 7.`
);
