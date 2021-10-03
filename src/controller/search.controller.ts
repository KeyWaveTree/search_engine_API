import express from "express";
import { KMR } from "koalanlp/API";
import { Tagger } from "koalanlp/proc";

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


export default router;
