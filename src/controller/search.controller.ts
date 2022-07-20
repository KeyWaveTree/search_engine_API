import express from "express";
import { KMR } from "koalanlp/API";
import { Tagger } from "koalanlp/proc";
<<<<<<< HEAD
import { Keyword } from "../models/Keyword";
import { Link } from "../models/Link";
import { Op } from "sequelize";

// Router는 웹 서버와 같이 라우트 매칭과 요청-응답 처리 기능을 모두 지원
const router = express.Router();

type FrequentLink = {
  url: string;
  content: string;
  count: number;
};

// get 메소드를 사용하는 라우터 함수 작성
// 서버요청하는 정보 담김: req, 클라이언트 요청응답: res
// 일정한 분기점
router.get("/", async (req, res) => {
  // pass버라이어블 사용할 필요없음. 요청하는 쿼리파라미터는 들어오는 값
  const { q } = req.query;

  // 검사를 반드시 해줘야하는 필요가 있음.
  if (!q) {
    return res.status(400).json();
  }
  // 자료구조는 Set을 사용
  const tagger = new Tagger(KMR);
  const tagged = await tagger(q);
  const SearchKeywords: Set<string> = new Set();

  for (const sent of tagged) {
    for (const word of sent._items) {
      for (const morpheme of word._items) {
        if (
          morpheme._tag === "NNG" ||
          morpheme._tag === "NNP" ||
          morpheme._tag === "NNB" ||
          morpheme._tag === "NP" ||
          morpheme._tag === "NR" ||
          morpheme._tag === "VV" ||
          morpheme._tag === "SL"
        ) {
          const keyword = morpheme._surface.toLowerCase();
          SearchKeywords.add(keyword);
        }
      }
    }
  }
  const keywords = await Keyword.findAll({
    where: {
      SearchId: {
        //Op.in이 배열로 저장되어있으니 받는 값도 배열
        [Op.in]: Array.from(SearchKeywords.values()),
      },
    },
    include: [Link],
  });

  const frequentLink = new Map<string, FrequentLink>();
  keywords.forEach((keyword) => {
    keyword.links.forEach((link) => {
      const exist = frequentLink.get(link.url);
      if (exist) {
        exist.count = exist.count + 1;
        frequentLink.set(link.url, exist);
      } else {
        frequentLink.set(link.url, {
          url: link.url,
          content: link.description,
          count: 1,
        });
      }
    });
  });

  //내림차순 정렬
  const result = Array.from(frequentLink.values()).sort(
    (link1, link2) => link2.count - link1.count
  );
  return res.status(200).json(result);
});

=======

// Router는 웹 서버와 같이 라우트 매칭과 요청-응답 처리 기능을 모두 지원
const router=express.Router();

// get 메소드를 사용하는 라우터 함수 작성
// 서버요청하는 정보 담김: req, 클라이언트 요청응답: res
// 일정한 분기점 
router.get("/", async(req,res)=>{
    // pass버라이어블 사용할 필요없음. 요청하는 쿼리파라미터는 들어오는 값
    const { q }=req.query;

    // 검사를 반드시 해줘야하는 필요가 있음.
    if(!q){
        return res.status(400).json();
    }
    // 자료구조는 Set을 사용
    const tagger=new Tagger(KMR);
    const tagged=await tagger(q);
    const SearchKeywords:Set<string>=new Set();

    for (const sent of tagged) {
        for (const word of sent._items) {
          for (const morpheme of word._items) {
            if (
              morpheme._tag === "NNG" ||
              morpheme._tag === "NNP" ||
              morpheme._tag === "NNB" ||
              morpheme._tag === "NP" ||
              morpheme._tag === "NR" ||
              morpheme._tag === "VV" ||
              morpheme._tag === "SL"
            ) {
                const keyword=morpheme._surface.toLowerCase();
                SearchKeywords.add(keyword);      
            }
        }
    }
}
return res.status(200).json(q);
});


>>>>>>> 04f39d3e4f883754d1f6b23479a519b80b6de6d5
export default router;
