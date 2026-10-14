module.exports=function handler(req,res){
  const b64=require('./chunks/og-pikachu-0.js')+require('./chunks/og-pikachu-1.js')+require('./chunks/og-pikachu-2.js')+require('./chunks/og-pikachu-3.js')+require('./chunks/og-pikachu-4.js');
  const buf=Buffer.from(b64,'base64');
  res.setHeader('Content-Type','image/jpeg');
  res.setHeader('Cache-Control','public, max-age=31536000, immutable');
  res.statusCode=200;res.end(buf);
};
