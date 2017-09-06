sudo aws iam upload-server-certificate \
    --server-certificate-name cert_dylanvann \
    --certificate-body file:///etc/letsencrypt/live/dylanvann.com/cert.pem \
    --private-key file:///etc/letsencrypt/live/dylanvann.com/privkey.pem \
    --certificate-chain file:///etc/letsencrypt/live/dylanvann.com/chain.pem \
    --path /cloudfront/certs/

