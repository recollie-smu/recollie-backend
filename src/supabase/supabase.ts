/*
  Channel name can be any string.
  Event name can can be one of:
    - INSERT
    - UPDATE
    - DELETE
    - *
*/
module.exports = (client) => {
    client
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
      },
      (payload) => console.log("Changes:", payload)
    )
    .subscribe()
}    
   