;; identity contract

(define-data-var next-identity-id uint u0)

(define-map identities
  { identity-id: uint }
  {
    owner: principal,
    did: (string-ascii 100),
    created-at: uint,
    updated-at: uint
  }
)

(define-public (create-identity (did (string-ascii 100)))
  (let
    (
      (identity-id (var-get next-identity-id))
    )
    (map-set identities
      { identity-id: identity-id }
      {
        owner: tx-sender,
        did: did,
        created-at: block-height,
        updated-at: block-height
      }
    )
    (var-set next-identity-id (+ identity-id u1))
    (ok identity-id)
  )
)

(define-read-only (get-identity (identity-id uint))
  (map-get? identities { identity-id: identity-id })
)

(define-public (update-did (identity-id uint) (new-did (string-ascii 100)))
  (let
    (
      (identity (unwrap! (map-get? identities { identity-id: identity-id }) (err u404)))
    )
    (asserts! (is-eq tx-sender (get owner identity)) (err u403))
    (ok (map-set identities
      { identity-id: identity-id }
      (merge identity { did: new-did, updated-at: block-height })
    ))
  )
)

