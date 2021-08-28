const db = require("../db")

/** User class for message.ly */

/** User of the site. */

class User {
  constructor({ username, password, first_name, last_name, phone, join_at, last_login_at}){
    this.username = username;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.join_at = join_at;
    this.last_login_at = last_login_at

  }
  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) { 
    const result = await db.query(
      `INSERT INTO users(username, password, first_name, last_name, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING username`,
      [this.username, this.password, this.first_name, this.last_name, this.phone]
    )
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) { }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) { }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const results = await db.query(
      `SELECT username
      FROM users
      ORDER BY username`
    );
    return results.rows.map(u => new User(u))
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    const results = await db.query(
      `SELECT username
      FROM users;
      WHERE username = $1
      RETURNING first_name, last_name, phone, join_at, last_login_at`,
      [username]
    )
    const user = ressults.rows[0]

    if(user === undefined) {
      const err = new Error("No username with that name")
      err.status = 404;
      throw err
    }
    return new User(user)
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {id, first_name, last_name, phone}
   */

  static async messagesTo(username) { }
}


module.exports = User;